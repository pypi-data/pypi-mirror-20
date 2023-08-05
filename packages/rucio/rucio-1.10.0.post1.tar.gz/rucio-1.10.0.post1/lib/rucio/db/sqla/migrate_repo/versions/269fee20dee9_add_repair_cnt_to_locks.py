# Copyright European Organization for Nuclear Research (CERN)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# You may not use this file except in compliance with the License.
# You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
#
# Authors:
# - Martin Barisits, <martin.barisits@cern.ch>, 2015

"""Add repair_cnt to locks

Revision ID: 269fee20dee9
Revises: 3d9813fab443
Create Date: 2015-07-13 17:52:33.103379

"""

from alembic import op, context
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '269fee20dee9'
down_revision = '1d96f484df21'


def upgrade():
    if context.get_context().dialect.name not in ('sqlite'):
        op.add_column('locks', sa.Column('repair_cnt', sa.BigInteger()))


def downgrade():
    if context.get_context().dialect.name not in ('sqlite'):
        op.drop_column('locks', 'repair_cnt')
