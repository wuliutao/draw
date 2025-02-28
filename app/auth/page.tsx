'use client'
import { useState } from 'react'
import styles from './auth.module.css'
import Link from 'next/link'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <main className={styles.authContainer}>
      <Link href="/" className={styles.backButton}>
        ← 返回首页
      </Link>
      
      <div className={styles.authCard}>
        <h1>{isLogin ? '欢迎回来' : '创建账号'}</h1>
        <div className={styles.switchButtons}>
          <button 
            className={`${styles.switchButton} ${isLogin ? styles.active : ''}`}
            onClick={() => setIsLogin(true)}
          >
            登录
          </button>
          <button 
            className={`${styles.switchButton} ${!isLogin ? styles.active : ''}`}
            onClick={() => setIsLogin(false)}
          >
            注册
          </button>
        </div>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>邮箱</label>
            <input type="email" placeholder="请输入邮箱" />
          </div>
          
          <div className={styles.inputGroup}>
            <label>密码</label>
            <input type="password" placeholder="请输入密码" />
          </div>

          {!isLogin && (
            <div className={styles.inputGroup}>
              <label>确认密码</label>
              <input type="password" placeholder="请再次输入密码" />
            </div>
          )}

          <button type="submit" className={styles.submitButton}>
            {isLogin ? '登录' : '注册'}
          </button>
        </form>

        {isLogin && (
          <p className={styles.forgotPassword}>
            忘记密码？<a href="#">点击这里</a>
          </p>
        )}
      </div>
    </main>
  )
} 