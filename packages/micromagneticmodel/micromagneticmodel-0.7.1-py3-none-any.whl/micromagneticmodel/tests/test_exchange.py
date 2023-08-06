import pytest
import numbers
import micromagneticmodel as mm


class TestExchange:
    def setup(self):
        self.valid_args = [1, 2.0, 5e-11, 1e-12, 1e-13, 1e-14, 1e6]
        self.invalid_args = [-1, -2.1, 'a', (1, 2), -3.6e-6, '0', [1, 2, 3]]

    def test_init_valid_args(self):
        for A in self.valid_args:
            exchange = mm.Exchange(A)
            assert exchange.A == A
            assert isinstance(exchange.A, numbers.Real)

    def test_init_invalid_args(self):
        for A in self.invalid_args:
            with pytest.raises(Exception):
                exchange = mm.Exchange(A)

    def test_repr_latex_(self):
        for A in self.valid_args:
            exchange = mm.Exchange(A)
            latex = exchange._repr_latex_()

            # Assert some characteristics of LaTeX string.
            assert isinstance(latex, str)
            assert latex[0] == latex[-1] == '$'
            assert '\\nabla' in latex
            assert 'A' in latex
            assert latex.count('+') == 2

    def test_name(self):
        for A in self.valid_args:
            exchange = mm.Exchange(A)
            assert exchange.name == 'exchange'

    def test_repr(self):
        for A in self.valid_args:
            exchange = mm.Exchange(A)
            assert repr(exchange) == 'Exchange(A={})'.format(A)

        exchange = mm.Exchange(8.78e-12)
        assert repr(exchange) == "Exchange(A=8.78e-12)"

    def test_script(self):
        for A in self.valid_args:
            exchange = mm.Exchange(A)
            with pytest.raises(NotImplementedError):
                script = exchange._script
