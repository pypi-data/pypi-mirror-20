import os

from dbt.logger import GLOBAL_LOGGER as logger
import dbt.targets

import psycopg2
import logging
import time
import datetime


QUERY_VALIDATE_NOT_NULL = """
with validation as (
  select {field} as f
  from "{schema}"."{table}"
)
select count(*) from validation where f is null
"""

QUERY_VALIDATE_UNIQUE = """
with validation as (
  select {field} as f
  from "{schema}"."{table}"
  where {field} is not null
),
validation_errors as (
    select f from validation group by f having count(*) > 1
)
select count(*) from validation_errors
"""

QUERY_VALIDATE_ACCEPTED_VALUES = """
with all_values as (
  select distinct {field} as f
  from "{schema}"."{table}"
),
validation_errors as (
    select f from all_values where f not in ({values_csv})
)
select count(*) from validation_errors
"""

QUERY_VALIDATE_REFERENTIAL_INTEGRITY = """
with parent as (
  select {parent_field} as id
  from "{schema}"."{parent_table}"
), child as (
  select {child_field} as id
  from "{schema}"."{child_table}"
)
select count(*) from child
where id not in (select id from parent) and id is not null
"""

DDL_TEST_RESULT_CREATE = """
create table if not exists {schema}.dbt_test_results (
    tested_at timestamp without time zone,
    model_name text,
    errored bool,
    skipped bool,
    failed bool,
    count_failures integer,
    execution_time double precision
);
"""


class SchemaTester(object):
    def __init__(self, project):
        self.project = project

        self.test_started_at = datetime.datetime.now()

    def get_target(self):
        target_cfg = self.project.run_environment()
        return dbt.targets.get_target(target_cfg)

    def execute_query(self, model, sql):
        target = self.get_target()

        with target.get_handle() as handle:
            with handle.cursor() as cursor:
                try:
                    logger.debug("SQL: %s", sql)
                    pre = time.time()
                    cursor.execute(sql)
                    post = time.time()
                    logger.debug(
                        "SQL status: %s in %d seconds",
                        cursor.statusmessage, post-pre)
                except psycopg2.ProgrammingError as e:
                    logger.debug('programming error: %s', sql)
                    return e.diag.message_primary
                except Exception as e:
                    logger.debug(
                        'encountered exception while running: %s', sql)
                    e.model = model
                    raise e

                result = cursor.fetchone()
                if len(result) != 1:
                    logger.debug("SQL: %s", sql)
                    logger.debug("RESULT: %s", result)
                    raise RuntimeError(
                        "Unexpected validation result. Expected 1 record, "
                        "got {}".format(len(result)))
                else:
                    return result[0]

    def validate_schema(self, schema_test):
            sql = schema_test.render()
            num_rows = self.execute_query(model, sql)
            if num_rows == 0:
                logger.info("  OK")
                yield True
            else:
                logger.info("  FAILED ({})".format(num_rows))
                yield False
