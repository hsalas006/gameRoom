
import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

export default class Sessions extends Component{
    state = {
        posts: [],
        totalPosts: 0,
      };

    componentDidMount() {
        fetch('URL')
          .then(res => {
            if (res.status !== 200) {
              throw new Error('Failed to fetch user status.');
            }
            return res.json();
          })
          .then(resData => {
            this.setState({ status: resData.status });
          })
          .catch(this.catchError);
    
        this.loadPosts();
      }
    
      loadPosts = direction => {
        if (direction) {
          this.setState({ postsLoading: true, posts: [] });
        }
        let page = this.state.postPage;
        if (direction === 'next') {
          page++;
          this.setState({ postPage: page });
        }
        if (direction === 'previous') {
          page--;
          this.setState({ postPage: page });
        }
        fetch('URL')
          .then(res => {
            if (res.status !== 200) {
              throw new Error('Failed to fetch posts.');
            }
            return res.json();
          })
          .then(resData => {
            this.setState({
              posts: resData.posts,
              totalPosts: resData.totalItems,
              postsLoading: false
            });
          })
          .catch(this.catchError);
      };

    render(){
        return(
            <div className="jumbotron">
                <h2 className="display-5 text-center">Sessiones Disponibles:</h2>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Sesion</th>
                        <th>Nivel</th>
                        <th>Disponibilidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>#Mark</td>
                        <td>1</td>
                        <td>libre</td>
                        </tr>
                        <tr>
                        <td>#Jacob</td>
                        <td>2</td>
                        <td>ocupado</td>
                        </tr>
                    </tbody>
                    </Table>;
            </div>  
        );
    }
};