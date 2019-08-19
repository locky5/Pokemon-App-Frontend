import React from 'react'
import LoadingPage from './LoadingPage'
import { Link } from 'react-router-dom'

class PokemonCard extends React.Component {

  state = {
    spriteUrl: null,
    abilities: [],
    stats: {},
    type1: null,
    type2: 'null',
    locationUrl: null,
    moves: null,
    items: null
  }

  componentDidMount() {
    this.renderThisData()
  }

  renderThisData = () => {
    fetch(`${this.props.url}`)
      .then(res => res.json())
      .then(data => {
        if (data.types[1]) {
          this.setState((prevState) => ({
            spriteUrl: data.sprites['front_default'],
            abilities: [...prevState.abilities, data.abilities],
            stats: {
              speed: data.stats[0].base_stat,
              specialDefense: data.stats[1].base_stat,
              specialAttack: data.stats[2].base_stat,
              defense: data.stats[3].base_stat,
              attack: data.stats[4].base_stat,
              hp: data.stats[5].base_stat
            },
            type1: data.types[0].type.name,
            type2: data.types[1].type.name,
            locationUrl: data.location_area_encounters,
            moves: data.moves,
            items: data.held_items
          }))
        } else {
          this.setState((prevState) => ({
            spriteUrl: data.sprites['front_default'],
            abilities: [...prevState.abilities, data.abilities],
            stats: {
              speed: data.stats[0].base_stat,
              specialDefense: data.stats[1].base_stat,
              specialAttack: data.stats[2].base_stat,
              defense: data.stats[3].base_stat,
              attack: data.stats[4].base_stat,
              hp: data.stats[5].base_stat
            },
            type1: data.types[0].type.name,
            locationUrl: data.location_area_encounters,
            moves: data.moves,
            items: data.held_items
          }))
        }

      })
  }

  render() {
    return (
      <div className="card">
        <Link to={{
            pathname: '/pokemons' + '/' + this.props.id,
            state: {
              id: this.props.id,
              name: this.props.name,
              spriteUrl: this.state.spriteUrl,
              abilities: this.state.abilities,
              speed: this.state.stats.speed,
              specialDefense: this.state.stats.specialDefense,
              specialAttack: this.state.stats.specialAttack,
              defense: this.state.stats.defense,
              attack: this.state.stats.attack,
              hp: this.state.stats.hp,
              type1: this.state.type1,
              type2: this.state.type2,
              locationUrl: this.state.locationUrl,
              moves: this.state.moves,
              items: this.state.items,
              allMoves: this.props.allMoves,
              actualUrl: this.props.url
            }
          }}
        >
          <div className="container" onClick={this.showDetails}>
            <h1>{this.props.name}</h1>
            {this.state.spriteUrl ? <img src={this.state.spriteUrl}/> : <LoadingPage />}
          </div>
        </Link>
      </div>
    )
  }
}

export default PokemonCard
