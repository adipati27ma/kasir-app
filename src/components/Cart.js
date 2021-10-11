import { Badge, Col, ListGroup, Row } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';

const Cart = ({ carts }) => {
  return (
    <Col md={3} mt="2">
      <h2>
        <b>Keranjang</b>
      </h2>
      <hr />

      {carts.length !== 0 && (
        <ListGroup variant="flush">
          {carts.map((cart) => (
            <ListGroup.Item key={cart.id}>
              <Row>
                <Col xs={2}>
                  <p className="h5">
                    <Badge pill bg="success">
                      {cart.jumlah}
                    </Badge>
                  </p>
                </Col>
                <Col>
                  <p className="h5">{cart.product.nama}</p>
                  <p>Rp. {numberWithCommas(cart.product.harga)}</p>
                </Col>
                <Col>
                  <b className="float-end">
                    Rp. {numberWithCommas(cart.total_harga)}
                  </b>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
  );
};

export default Cart;
