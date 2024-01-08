import React,{useEffect} from "react";
import Routes from './src/routes';
import { BackHandler } from 'react-native';


export default function App() {
 
  useEffect(() => {
    BackHandler.addEventListener('backPress', () => true)
    return () => BackHandler.removeEventListener('backPress', () => true)
  }, [])

  return (
    <Routes/>    
  );
}

