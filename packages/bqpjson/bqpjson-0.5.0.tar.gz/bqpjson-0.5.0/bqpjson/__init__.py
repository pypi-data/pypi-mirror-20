
__version__ = '0.5.0'

from bqpjson.core import (
    validate, evaluate, swap_variable_domain, spin_to_bool, bool_to_spin,
    bqpjson_to_qubist, bqpjson_to_qubo, bqpjson_to_minizinc
)

# needed for testing, not deployment
from bqpjson import cli
