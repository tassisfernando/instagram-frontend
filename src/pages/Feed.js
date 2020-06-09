import React, { Component } from 'react';
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

import api from '../services/api';

class Feed extends Component {

    //servirá para recuperar dados da api e quando for alterado impactará no HTML
    state = {
        feed: [],
    };

    //quando o componente for montado vai fazer uma chamada assincrona na rota posts
    async componentDidMount(){
        this.registerToSocket();

        const response = await api.get('posts');

        this.setState({ feed: response.data });
    }   

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        //se vier da API uma mensagem de criação de um novo post, esse método irá escutá-la
        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] }); //salva o novo post como primeiro no array e o restante com os anteriores
        })

        //vai atualizar o num de likes com o id igual ao da requisição 
        socket.on('like', likedPost => {
            this.setState( {
                feed: this.state.feed.map(post => 
                    post._id === likedPost._id ? likedPost : post    
                )
             });
        })
    }
    //função que dá like recebendo o id do post
    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }
    //renderiza o componente com o que está dentro do render()
    render(){
        return (
            <section id="post-list">
                { this.state.feed.map(post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>
                            <img src={more} alt="Mais" />

                        </header>

                        <img src={`http://localhost:3333/files/${post.image}`} alt="" />

                        <footer>
                            <div className="actions">
                                <button type="button" onClick={() => this.handleLike(post._id)}> 
                                    <img src={like} alt="" />
                                </button>
                                <img src={comment} alt="" />
                                <img src={send} alt="" />
                            </div>

                            <strong>{post.likes} curtidas</strong>
                            <p>
                                {post.description}
                                <span>{post.hashtags}</span>
                            </p>
                        </footer>
                    </article>
                )) }
            </section>
        );
    }
}

export default Feed;