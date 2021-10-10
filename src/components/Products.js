import { Col, Row } from 'react-bootstrap';
import Product from './Product';

const Products = ({ menus }) => {
  return (
    <Col>
      <h2>
        <b>Daftar Menu</b>
      </h2>
      <hr />
      <Row>
        {menus && menus.map((menu) => <Product key={menu.id} menu={menu} />)}
      </Row>
    </Col>
  );
};

export default Products;
