import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';

const Cart = () => {
  return (
    <Badge badgeContent={2} color="primary">
        <ShoppingCartIcon />
    </Badge>
  )
}

export default Cart