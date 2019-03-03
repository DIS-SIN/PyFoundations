from sqlalchemy import BigInteger, Column, DateTime, JSON, Table, Text

t_relationships = Table(
    "relationships",
    Column("source_id", BigInteger),
    Column("target_id", BigInteger),
    Column("type", Text),
    Column("created_on", DateTime(True)),
    Column("deleted_on", DateTime(True)),
)

t_interest_maps = Table(
    "interest_maps", Column("streams", JSON), Column("practices", JSON)
)
