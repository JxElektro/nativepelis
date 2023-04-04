import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import PemieredMovies from '../components/PemieredMovies'
import PopularMovies from '../components/PopularMovies'

const MovieList = (props: any) => {
  return (
    <view>
      <PemieredMovies />
      <PopularMovies />
    </view>
  )
}

MovieList.propTypes = {}

export default MovieList