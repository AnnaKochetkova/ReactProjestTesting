import { Button } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Home</h1>
      <Link href={"/login"}>
        <Button variant="outlined" size="large">Log in</Button>
      </Link>
      
    </div>
  )
}

export default Home
