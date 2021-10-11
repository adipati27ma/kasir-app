import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { API_URL } from './utils/constants';
import axios from 'axios';
import Swal from 'sweetalert2';

import { Cart, ListCategories, NavbarComponent, Products } from './components';

function App() {
  const [menus, setMenus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Makanan');
  const [carts, setCarts] = useState('');
  const [carstUpdated, setCartsUpdated] = useState(false);

  const handleChangeCategory = (value) => {
    setSelectedCategory(value);

    axios
      .get(`${API_URL}products?category.nama=${value}`)
      .then((res) => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = (product) => {
    let found = false;
    let index;

    // Check if the product is in the cart or not
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].product.id === product.id) {
        found = true;
        index = i;
        break;
      }
    }

    if (found === false) {
      const cart = {
        jumlah: 1,
        total_harga: product.harga,
        product: product,
      };

      axios
        .post(`${API_URL}carts`, cart)
        .then((res) => {
          if (res.status) {
            setCartsUpdated(true);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Sukses',
              html: `<b>${product.nama}</b> telah dimasukkan ke keranjang`,
              showConfirmButton: false,
              timer: 1700,
            });
          }
        })
        .catch((err) => {
          console.log(`Failed add to cart (1) : ${err}`);
        });
    } else {
      const cart = {
        jumlah: carts[index].jumlah + 1,
        total_harga: carts[index].total_harga + product.harga,
        product: product,
      };

      axios
        .put(`${API_URL}carts/${carts[index].id}`, cart)
        .then((res) => {
          if (res.status) {
            setCartsUpdated(true);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Sukses',
              html: `<b>${product.nama}</b> telah dimasukkan ke keranjang`,
              showConfirmButton: false,
              timer: 1700,
            });
          }
        })
        .catch((err) => {
          console.log(`Failed add to cart (2) : ${err}`);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}products?category.nama=${selectedCategory}`)
      .then((res) => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${API_URL}carts`)
      .then((res) => {
        const carts = res.data;
        setCarts(carts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCategory]);

  useEffect(() => {
    if (carstUpdated) {
      axios
        .get(`${API_URL}carts`)
        .then((res) => {
          const carts = res.data;
          setCarts(carts);
        })
        .catch((err) => {
          console.log(err);
        });
      setCartsUpdated(false);
    }
  }, [carstUpdated]);

  return (
    <div className="App">
      <NavbarComponent />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              handleChangeCategory={handleChangeCategory}
              selectedCategory={selectedCategory}
            />
            <Products menus={menus} addToCart={addToCart} />
            <Cart carts={carts} />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
