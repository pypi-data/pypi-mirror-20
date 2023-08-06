from .query_components import TableExpression
from .column import ColumnExpr

class Table(TableExpression):
    """Represents a database table."""
    
    def __init__(self, table_name, column_names, schema=None):
        """Initializes a table."""
        # Construct table's qualified name
        if schema is not None:
            self.name = '.'.join([schema, table_name])
        else:
            self.name = table_name
        
        # Register all the columns of this table.
        self._column_names = tuple(column_names)
        self._column_exprs = {
            name: ColumnExpr(name, self) for name in self._column_names}
    
    def __hash__(self):
        """Calculates a hash value for this table.
        
        Hash is generated from the table's qualifed name.
        
        qualifed_name := [schema_name '.'] table_name
        
        :return: The computed hash value.
        """
        return hash(self.name)
    
    def __eq__(self, other):
        """Checks for equality with another table.
        
        :param other: The object to compare with this. If it is a table,
          their names are compared. If not, the comparison returns false.
        
        :return: A boolean representing whether the two objects are equal.
        """
        if isinstance(other, Table):
            return self.name == other.name
        else:
            return False
    
    def __getitem__(self, key):
        if isinstance(key, str):
            return self._column_exprs[key]
        else:
            raise TypeError('Tables require strings for lookup keys.')
    
    def _get_from_field(self):
        return self.name
    
    def _get_selectables(self):
        return tuple(self._column_exprs[k] for k in self._column_names)
    
    def as_(self, alias):
        return AliasedTable(self, alias)

class AliasedTable(TableExpression):
    """A table that has been given an alias for use in queries."""
    
    def __init__(self, table, alias):
        """Initializes an aliased table from a table and an alias."""
        self.table = table
        self.name = alias
        
        # Add the underlying table's columns.
        self._column_names = table._column_names
        self._column_exprs = {
            name: ColumnExpr(name, self) for name in self._column_names}
    
    def __hash__(self):
        return hash((self.name, self.table))
    
    def __eq__(self, other):
        if isinstance(other, AliasedTable):
            return self.name == other.name and self.table == other.table
        else:
            return False
    
    def __getitem__(self, key):
        if isinstance(key, str):
            return self._column_exprs[key]
        else:
            raise TypeError('Tables require strings for lookup keys.')
    
    def _get_from_field(self):
        """Returns the appropriate from field for queries.
        
        This field includes both the table's original from field and the
        new alias.
        """
        return '{} AS {}'.format(
            self.table.name, self.name)
    
    def _get_selectables(self):
        return tuple(self._column_exprs[k] for k in self._column_names)
