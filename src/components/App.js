import React from 'react';
import Card from './Card';
import axios from 'axios';
import {endpoints, getImageUrl} from '../config';
class  App extends React.Component{

    genre = -1;

    constructor() {
        super();

        this.state = {
            list: [],
            list2: [],
        };
    }

    componentDidMount() {
        axios
            .get(endpoints.mostPopularMovies())
            .then((data) => {
                this.setState({
                    list: data.data.results
                });
            });

        axios
            .get(endpoints.genres())
            .then((data) => {
                this.setState({
                    list2: data.data.genres
                });
            });
    }

    render() {
        return (
            <div>
                {this.state.list2.map((info) => (
                    <button key={info.id} onClick={() => {
                        this.setState({list: []});
                        this.genre = info.id;

                        axios
                            .get(endpoints.genreMovies(this.genre))
                            .then((data) => {
                                this.setState({
                                    list: data.data.results,
                                });
                            });
                    }}
                        >
                        {info.name}
                    </button>
                ))}

              {this.state.list.map((card) => (
                  <Card
                      key={card.id}
                      title={card.original_title}
                      backgroundImage={getImageUrl(card.backdrop_path)}
                      data={card.release_date}
                      voteAverage={card.vote_average}
                      voteCount={card.vote_count}
                      description={card.overview}

                  />
              ))}
            </div>
        );
    }
}

export default App;