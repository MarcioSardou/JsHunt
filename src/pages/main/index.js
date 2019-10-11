import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class Main extends Component {

   state = {
      products : [],
      productInfo : {},
      page:1
   };
   componentDidMount() {
      this.loadProducts();
   }
   
   loadProducts = async(page = 1) => {
      const response = await api.get(`/products?page=${page}`);
      
      const { docs, ...productInfo } = response.data;
      
      this.setState({ products:docs, productInfo, page})

   }


   prevPage =() => {
      const { page, productInfo } = this.state;
      
      if (page === 1) return;

      const pageNumber = page - 1;

      this.loadProducts(pageNumber)
   };

   nextPage = () => {
      const { page, productInfo } = this.state;

      if (page == productInfo.pages) return;

      const pageNumber = page + 1;

      this.loadProducts(pageNumber);
   };

   render() {
   const { products } = this.state
      
      return (
         <div className="product-list">
            {products.map(item => (
               <article key={item._id}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>

                  <a href="">Acessar</a>
               </article>
            ))}
            <div className="actions">
               <button onClick={this.prevPage}>Prev</button>
               <button onClick={this.nextPage}>Next</button>
            </div>
         </div>
      )
   }
} 