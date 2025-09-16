# apps/autorent/urls.py
from rest_framework.routers import DefaultRouter
from .viewsets import CategoriaVeiculoViewSet, VeiculoViewSet, ReservaViewSet,PrecoDinamicoViewSet

router = DefaultRouter()
router.register(r'categorias', CategoriaVeiculoViewSet, basename='categoria')
router.register(r'veiculos', VeiculoViewSet, basename='veiculo')
router.register(r'reservas', ReservaViewSet, basename='reserva')
router.register(r'precos-dinamicos', PrecoDinamicoViewSet, basename='preco-dinamico')

urlpatterns = router.urls
