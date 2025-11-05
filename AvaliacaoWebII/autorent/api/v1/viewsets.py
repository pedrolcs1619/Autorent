from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from autorent.models import CategoriaVeiculo, Veiculo, Reserva, PrecoDinamico
from .serializers import (
    CategoriaVeiculoSerializer,
    VeiculoSerializer,
    ReservaSerializer,
    PrecoDinamicoSerializer
)
from ...utils import calcular_preco_total_reserva







class CategoriaVeiculoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaVeiculo.objects.all()
    serializer_class = CategoriaVeiculoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    


class VeiculoViewSet(viewsets.ModelViewSet):
    queryset = Veiculo.objects.all()
    serializer_class = VeiculoSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Soft Delete
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    

class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Soft Delete
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # Lógica custom de criação
    def perform_create(self, serializer):
        veiculo = serializer.validated_data["veiculo"]
        data_inicio = serializer.validated_data["data_inicio"]
        data_fim = serializer.validated_data["data_fim"]
        preco_total = calcular_preco_total_reserva(veiculo, data_inicio, data_fim)
        serializer.save(usuario=self.request.user, preco_total=preco_total)

    def create(self, request, *args, **kwargs):
        veiculo_id = request.data.get("veiculo")
        data_inicio = request.data.get("data_inicio")
        data_fim = request.data.get("data_fim")

        veiculo = Veiculo.objects.get(id=veiculo_id)
        preco_total = calcular_preco_total_reserva(veiculo, data_inicio, data_fim)

        data = request.data.copy()
        data["preco_total"] = preco_total
        data["usuario"] = request.user.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Lógica custom de atualização
    def update(self, request, *args, **kwargs):
        reserva = self.get_object()
        veiculo = reserva.veiculo
        data_inicio = request.data.get("data_inicio", reserva.data_inicio)
        data_fim = request.data.get("data_fim", reserva.data_fim)

        preco_total = calcular_preco_total_reserva(veiculo, data_inicio, data_fim)

        data = request.data.copy()
        data["preco_total"] = preco_total

        serializer = self.get_serializer(reserva, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PrecoDinamicoViewSet(viewsets.ModelViewSet):
    queryset = PrecoDinamico.objects.all()
    serializer_class = PrecoDinamicoSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Soft Delete
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ------------------------------
# JWT com cookies
# ------------------------------

class CookieTokenObtainPairViewSet(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
     
        if response.status_code == 200:

            refresh = response.data.get("refresh")
            access = response.data.get("access")
            
            response.data.clear()
            response.data["mensagem"] = "Loggin realizado com sucesso"

            response.set_cookie(
                key="access_token",
                value=access,
                httponly=True,
                secure=False,
                samesite="Lax",
                max_age=60*60,
            )
            response.set_cookie(
                key="refresh_token",
                value=refresh,
                httponly=True,
                secure=False,
                samesite="Lax",
                max_age=60*60,
            )

        return response


class CookieTokenRefreshViewSet(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        new_access = response.data.get("access")
        if new_access:
            
            response.data.clear()
            response.data["menssage"] = "Token atualizado com sucesso"

            response.set_cookie(
                key="access_token",
                value=new_access,
                httponly=True,
                secure=False,
                samesite="Lax",
                max_age=60*60
            )
        return response

class LogoutViewSet(APIView):
    def post(self, request):
        response = Response({"detail": "Logout realizado com sucesso."},
                             status = status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response



# autorent/api/v1/viewsets.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class MeViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        })