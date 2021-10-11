import { Col, Row } from 'react-bootstrap';
import Product from './Product';

const Products = ({ menus, addToCart }) => {
  return (
    <Col>
      <h2>
        <b>Daftar Menu</b>
      </h2>
      <hr />
      <Row>
        {menus &&
          menus.map((menu) => (
            <Product key={menu.id} menu={menu} addToCart={addToCart} />
          ))}
      </Row>
    </Col>
  );
};

export default Products;
