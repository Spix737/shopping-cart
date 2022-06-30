import { useState } from "react";
import { useQuery } from "react-query";
// Components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import { Drawer, Grid, LinearProgress, Badge } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// Styles
import { Wrapper, StyledButton } from "./App.styles";
import { CollectionsOutlined } from "@mui/icons-material";
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  quantity: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products', getProducts);

    const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.quantity, 0);

    const handleAddToCart = (clickedItem: CartItemType) => {
      setCartItems(prev => {
        //1. Is the item already in the cart?
        const itemInCart = prev.find(item => item.id === clickedItem.id);
     
        if(itemInCart) {
          return prev.map(item => (
            item.id === clickedItem.id ? { ...item, quantity: item.quantity + 1 } : item
          ))
        }
        //First time item is added
        return [...prev , { ...clickedItem, quantity: 1 }];
      })
    };

    const handleRemoveFromCart = (id: number) => {
      setCartItems(prev => (
        prev.reduce((ack, item) => {
          if(item.id === id) {
            if(item.quantity === 1) return ack;
            return [...ack, { ...item, quantity: item.quantity - 1 }]
          } else {
              return[...ack, item];
          }
        }, [] as CartItemType[])
      ))
    }
    ;

    if (isLoading) return <LinearProgress/>;
    if (error) return <div>Something went wrong...</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='secondary'>
          <ShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
        <Grid item xs={12} sm={4} key={item.id}>
          <Item item={item} handleAddToCart={handleAddToCart} /> 
        </Grid>
      ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
