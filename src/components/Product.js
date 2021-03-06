import { Card, Col, Button } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';

const Product = ({ menu, addToCart }) => {
  return (
    <Col md={4} sm={6} className="py-2 px-2">
      <Card className="shadow">
        <Card.Img
          style={{ height: '165px' }}
          variant="top"
          src={`assets/images/${menu.category.nama.toLowerCase()}/${
            menu.gambar
          }`}
        />
        <Card.Body>
          <Card.Title>{menu.nama}</Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
          <Button variant="primary" onClick={() => addToCart(menu)}>
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;
