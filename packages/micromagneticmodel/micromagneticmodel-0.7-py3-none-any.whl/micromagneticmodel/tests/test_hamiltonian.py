import pytest
import micromagneticmodel as mm


class TestHamiltonian:
    def setup(self):
        A = 1e-12
        self.exchange = mm.Exchange(A)
        H = (0, 0, 1.2e6)
        self.zeeman = mm.Zeeman(H)
        K = 1e4
        u = (0, 1, 0)
        self.uniaxialanisotropy = mm.UniaxialAnisotropy(K, u)
        self.demag = mm.Demag()

        self.terms = [self.exchange,
                      self.zeeman,
                      self.uniaxialanisotropy,
                      self.demag]

        self.invalid_terms = [1, 2.5, 0, 'abc', [3, 7e-12],
                              [self.exchange, self.zeeman]]

    def test_add_terms(self):
        hamiltonian = mm.Hamiltonian()
        for term in self.terms:
            hamiltonian._add(term)

            assert isinstance(hamiltonian, mm.Hamiltonian)
            assert isinstance(hamiltonian.terms, list)
            assert hamiltonian.terms[-1] == term
            assert hamiltonian.terms[-1].name == term.name

        assert len(hamiltonian.terms) == 4

    def test_add_sum_of_terms(self):
        hamiltonian = self.exchange + self.zeeman + \
                      self.uniaxialanisotropy + self.demag

        assert isinstance(hamiltonian, mm.Hamiltonian)
        assert isinstance(hamiltonian.terms, list)
        assert len(hamiltonian.terms) == 4

    def test_add_hamiltonian(self):
        term_sum = self.exchange + self.zeeman
        hamiltonian = mm.Hamiltonian()
        hamiltonian += term_sum

        assert len(hamiltonian.terms) == 2

    def test_iadd(self):
        hamiltonian = mm.Hamiltonian()
        for term in self.terms:
            hamiltonian += term

            assert isinstance(hamiltonian, mm.Hamiltonian)
            assert isinstance(hamiltonian.terms, list)
            assert hamiltonian.terms[-1] == term
            assert hamiltonian.terms[-1].name == term.name

        assert len(hamiltonian.terms) == 4

    def test_repr_latex(self):
        hamiltonian = mm.Hamiltonian()
        latex = hamiltonian._repr_latex_()
        assert latex[0] == latex[-1] == '$'
        assert latex.count('$') == 2
        assert '\\mathcal{H}' in latex
        assert latex[-2] == '0'

        for term in self.terms:
            hamiltonian._add(term)

        latex = hamiltonian._repr_latex_()

        assert latex[0] == latex[-1] == '$'
        assert latex.count('$') == 2
        assert '\\mathcal{H}=' in latex
        assert 'A' in latex
        assert '\mathbf{m}' in latex
        assert '\mathbf{H}' in latex
        assert '\mathbf{u}' in latex
        assert 'K' in latex
        assert '\mathbf{H}_\\text{d}' in latex
        assert '\cdot' in latex
        assert '\\frac{1}{2}' in latex
        assert 'M_\\text{s}' in latex
        assert latex.count('-') == 2
        assert latex.count('+') == 3
        assert latex.count('=') == 1
        assert latex.count('\\nabla') == 3

    def test_add_exception(self):
        hamiltonian = mm.Hamiltonian()
        for term in self.invalid_terms:
            with pytest.raises(TypeError):
                hamiltonian += term

    def test_repr(self):
        hamiltonian = self.exchange + self.zeeman + \
                      self.uniaxialanisotropy + self.demag

        exp_str = ("Exchange(A=1e-12) + "
                   "Zeeman(H=(0, 0, 1200000.0)) + "
                   "UniaxialAnisotropy(K=10000.0, u=(0, 1, 0)) + "
                   "Demag()")
        assert repr(hamiltonian) == exp_str

    def test_getattr(self):
        hamiltonian = self.exchange + self.zeeman + \
                      self.uniaxialanisotropy + self.demag

        assert isinstance(hamiltonian.exchange, mm.Exchange)
        assert hamiltonian.exchange.A == 1e-12

        assert isinstance(hamiltonian.zeeman, mm.Zeeman)
        assert hamiltonian.zeeman.H == (0, 0, 1.2e6)

        assert isinstance(hamiltonian.uniaxialanisotropy,
                          mm.UniaxialAnisotropy)
        assert hamiltonian.uniaxialanisotropy.K == 1e4
        assert hamiltonian.uniaxialanisotropy.u == (0, 1, 0)

        assert isinstance(hamiltonian.demag, mm.Demag)

    def test_getattr_error(self):
        hamiltonian = self.exchange + self.zeeman

        with pytest.raises(AttributeError):
            demag = hamiltonian.demag

    def test_script(self):
        hamiltonian = mm.Hamiltonian()
        with pytest.raises(NotImplementedError):
            script = hamiltonian._script
