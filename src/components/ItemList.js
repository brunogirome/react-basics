import React, { Component } from "react";

import ItemItem from "./ItemItem";

class ItemList extends Component {
  state = {
    newItem: "",
    items: []
  };

  // Executado assim que o componente aparece na tela
  componentDidMount() {
    const items = localStorage.getItem('items');

    if (items){
      this.setState({ items: JSON.parse(items) });
    }
  }

  // Executado sempre que houver alteração nas props ou estados
  // @prevProps e @prevState são os estados antigos, eu posso comparar por 
  // exemplo um prevPrpos.item === this.props.items
  componentDidUpdate(prevProps, prevState) {
    if(prevState.items !== this.state.items) {
      localStorage.setItem('items', JSON.stringify(this.state.items));
    }
  }

  // Executado quando o componente deixa de existir 
  componentWillMount() {
    
  }

  handleInputChange = e => {
    // Variáveis no React são imutáveis, ou seja, traduzindo, elas não podem
    // ser alteradas diretamente
    // Para alterarmos, utilizamos o método SetState
    this.setState({ newItem: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.newItem === "") {
      return;
    }

    if (!this.checkIfExists(this.state.newItem)) {
      this.setState({
        items: [this.state.newItem, ...this.state.items],
        newItem: ""
      });
    } else {
      alert(`Item ${this.state.newItem} already exists`);
      this.setState({ newItem: "" });
    }
  };

  handleDelete = item => {
    this.setState({ items: this.state.items.filter(i => i !== item) });
  };

  checkIfExists = value => {
    const exists = this.state.items.find(item => item === value);

    return exists ? true : false;
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Item: {this.state.newItem}</h3>
        <ul>
          {this.state.items.map(item => (
            <ItemItem
              key={item}
              item={item}
              onDelete={() => this.handleDelete(item)}
            />
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newItem}
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

export default ItemList;
