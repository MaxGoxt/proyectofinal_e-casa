def subsetA(arr):
    # Ordenar la matriz en orden ascendente
    arr.sort( key=lambda x: x[0])

    conjunto_A = []
    suma_A = 0
    suma_B = sum(elemento[0] for elemento in arr)

    for elemento in reversed(arr):
        suma_B -= elemento[0]
        suma_A += elemento[0]
        conjunto_A.append(elemento[0])

        if suma_A > suma_B:
            conjunto_A.pop()  # Eliminar el último elemento agregado si se rompe la condición
            break

    # Devolver el resultado como una matriz
    resultado = []
    for elemento in conjunto_A:
        resultado.append([elemento])

    return resultado

# Ejemplo de uso
matriz1 = [
    [6],
    [5],
    [3],
    [2],
    [4],
    [1],
    [2]
]

resultado1 = subsetA(matriz1)
print("Subconjunto A para matriz1:", resultado1)