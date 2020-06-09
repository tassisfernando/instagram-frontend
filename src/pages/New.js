import React, { Component } from 'react';
import api from '../services/api';

import './New.css';

class New extends Component {

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
    }

    //função que vai ouvir eventos do teclado
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    //função que vai pegar o valor da imagem
    handleImageChange = e => {
        this.setState( { image: e.target.files[0] })
    }
    
    handleSubmit = async e => {
        e.preventDefault();

        //cria uma variável do tipo FormData, para poder enviar a imagem para a API
        const data = new FormData();

        //preenche data com os dados do state
        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        //chama o método post de criar Posts da api
        await api.post('posts', data);

        //retorna o user para a rota /
        this.props.history.push('/');
    }

    render(){
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleImageChange} />

                <input 
                    type="text" 
                    name="author"
                    placeholder="Autor do post"
                    onChange={this.handleChange}
                    value={this.state.author}
                />

                <input 
                    type="text" 
                    name="place"
                    placeholder="Local do post"
                    onChange={this.handleChange} 
                    value={this.state.place}
                />

                <input 
                    type="text"
                    name="description"
                    placeholder="Descrição do post"
                    onChange={this.handleChange}
                    value={this.state.description}
                />   

                <input 
                    type="text"
                    name="hashtags"
                    placeholder="Hashtags do post"
                    onChange={this.handleChange}
                    value={this.state.hashtags}
                />   

                <button type="submit">Publicar</button>
            </form>
        )
    }
}

export default New;