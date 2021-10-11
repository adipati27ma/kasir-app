import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import { API_URL } from '../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faCoffee,
  faCheese,
} from '@fortawesome/free-solid-svg-icons';

const Icon = ({ nama }) => {
  if (nama === 'Makanan')
    return <FontAwesomeIcon icon={faUtensils} className="me-2" />;
  if (nama === 'Minuman') return <FontAwesomeIcon icon={faCoffee} />;
  if (nama === 'Camilan')
    return <FontAwesomeIcon icon={faCheese} className="me-2" />;

  return '';
};

const ListCategories = ({ handleChangeCategory, selectedCategory }) => {
  const [categories, setCategories] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}categories`)
      .then((res) => {
        const categories = res.data;
        setCategories(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Col lg={2} mt="2">
      <h2>
        <b>Kategori</b>
      </h2>
      <hr />
      <ListGroup>
        {categories &&
          categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              style={{ cursor: 'pointer' }}
              onClick={() => handleChangeCategory(category.nama)}
              active={selectedCategory === category.nama ? true : false}
            >
              <span>
                <Icon nama={category.nama} /> {category.nama}
              </span>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Col>
  );
};

export default ListCategories;
