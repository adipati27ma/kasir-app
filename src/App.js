import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { API_URL } from './utils/constants';
import axios from 'axios';

import { Cart, ListCategories, NavbarComponent, Products } from './components';

function App() {
  const [menus, setMenus] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}products`)
      .then((res) => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <NavbarComponent />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories />
            <Products menus={menus} />
            <Cart />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
