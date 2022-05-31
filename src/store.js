import { configureStore, createSlice } from '@reduxjs/toolkit'

const pokemonColor = createSlice({
  name: 'pokemonColor',
  initialState: [],
  reducers: {
    setPokemonColor(state, action) {
      return action.payload
    },
  },
})

export const { setPokemonColor } = pokemonColor.actions

const pokemonType = createSlice({
  name: 'pokemonType',
  initialState: [],
  reducers: {
    setPokemonType(state, action) {
      return action.payload
    },
  },
})

export const { setPokemonType } = pokemonType.actions

const pokemonShape = createSlice({
  name: 'pokemonShape',
  initialState: [],
  reducers: {
    setPokemonShape(state, action) {
      return action.payload
    },
  },
})

export const { setPokemonShape } = pokemonShape.actions

const pokemonLetter = createSlice({
  name: 'pokemonLetter',
  initialState: [],
  reducers: {
    setPokemonLetter(state, action) {
      return action.payload
    },
  },
})

export const { setPokemonLetter } = pokemonLetter.actions

const pokemonDuplicates = createSlice({
  name: 'pokemonDuplicates',
  initialState: [],
  reducers: {
    setPokemonDuplicates(state, action) {
      return action.payload
    },
  },
})

export const { setPokemonDuplicates } = pokemonDuplicates.actions

const result = createSlice({
  name: 'result',
  initialState: {},
  reducers: {
    setResult(state, action) {
      return action.payload
    },
  },
})

export const { setResult } = result.actions

export default configureStore({
  reducer: {
    pokemonColor: pokemonColor.reducer,
    pokemonType: pokemonType.reducer,
    pokemonShape: pokemonShape.reducer,
    pokemonLetter: pokemonLetter.reducer,
    pokemonDuplicates: pokemonDuplicates.reducer,
    result: result.reducer,
  },
})
