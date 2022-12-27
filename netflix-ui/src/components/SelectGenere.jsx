import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { fetchDataByGenre } from '../store';

export default function SelectGenere({genres,type}) {
    const dispatch = useDispatch();
    return (
    <Select className='flex' onChange={e=> {
        dispatch(fetchDataByGenre({genere: e.target.value, type}));
    }}>
        {genres.map((genere)=>{
            return<option value={genere.id} key={genere.id}>
                {genere.name}
            </option>
        })}
    </Select>
  )
}

const Select = styled.select`
    margin-left: 5rem;
    cursor: pointer;
    font-size: 1.4rem;
    background-color: rgba(0,0,0,0.4);
    color: white;
`;
