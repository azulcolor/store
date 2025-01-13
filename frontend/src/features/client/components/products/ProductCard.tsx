import { Typography, Button, CardContent, Card } from "@mui/material";
import { Product } from "../../interfaces";

interface Props {
  product: Product;
  isProductInCart: (id: number) => boolean;
  addOrUpdateProduct: (productId: number, addNumber: number) => void;
}

export const ProductCard = ({ product, isProductInCart, addOrUpdateProduct }: Props) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center">
          <h2 className="text-2xl text-gray-700 mr-auto">{product.name}</h2>
          <p>Quedan: {product.stock} disponibles</p>
        </div>
        <p className=" text-md mb-4 text-gray-600 font-bold">${product.price} </p>

        {isProductInCart(product.id) ? (
          <Typography color="primary" sx={{ mt: 2 }}>
            Ya ha sido agregado
          </Typography>
        ) : product.stock === 0 ? (
          <Typography color="info" sx={{ mt: 2 }}>
            Sin stock
          </Typography>
        ) : (
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => addOrUpdateProduct(product.id, 1)}>
            Añadir al carrito
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
