'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { useState } from 'react'

export default function Home() {
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentTopic, setCurrentTopic] = useState<string | null>(null)
  const [currentSpeaker, setSpeaker] = useState<string | null>(null)
  const [usedSpeakers, setUsedSpeakers] = useState<string[]>([])
  const [remainingSpeakers, setRemainingSpeakers] = useState([
    "周周",
    "满义",
    "小吴",
    "玲玲",
    "李琪",
    "伽奇",
    "娜娜"
  ])

  const topics = [
    "待定主题1",
    "待定主题2",
    "待定主题3",
    "待定主题4",
    "待定主题5",
    "待定主题6",
    "待定主题7",
    "待定主题8",
    "待定主题9",
    "待定主题10"
  ]

  const drawTopic = () => {
    if (remainingSpeakers.length === 0) {
      alert("所有人都已经分享过了！")
      return
    }

    setIsDrawing(true)
    let count = 0
    const interval = setInterval(() => {
      // 随机抽取主题
      setCurrentTopic(topics[Math.floor(Math.random() * topics.length)])
      
      // 随机显示动画效果
      setSpeaker(remainingSpeakers[Math.floor(Math.random() * remainingSpeakers.length)])
      
      count++
      if (count > 10) {
        clearInterval(interval)
        setIsDrawing(false)
        
        // 确定最终抽中的人
        const finalSpeakerIndex = Math.floor(Math.random() * remainingSpeakers.length)
        const finalSpeaker = remainingSpeakers[finalSpeakerIndex]
        
        // 更新状态
        setSpeaker(finalSpeaker)
        setUsedSpeakers([...usedSpeakers, finalSpeaker])
        setRemainingSpeakers(remainingSpeakers.filter(s => s !== finalSpeaker))
      }
    }, 100)
  }

  return (
    <main className={styles.main}>
      {/* 顶部导航栏 */}
      <nav className={styles.nav}>
        <div className={styles.logo}>AI应用分享会抽签</div>
        <div className={styles.navLinks}>
          <a href="#rules">规则说明</a>
          <a href="#topics">主题库</a>
          <a href="#history">历史记录</a>
          <a href="/auth" className={styles.authButton}>登录/注册</a>
        </div>
      </nav>

      {/* 主要内容区 */}
      <section className={styles.drawSection}>
        <div className={styles.topicCard}>
          <h1>AI应用分享会抽签</h1>
          <p className={styles.description}>
            点击下方按钮随机抽取分享人和AI相关话题，准备时间2分钟，分享时间自己斟酌
          </p>
          
          <div className={styles.topicDisplay}>
            {currentTopic && currentSpeaker ? (
              <>
                <h2>本次分享信息：</h2>
                <p className={styles.speaker}>分享人：{currentSpeaker}</p>
                <p className={styles.topic}>分享主题：{currentTopic}</p>
                <p className={styles.remainingInfo}>
                  待分享：{remainingSpeakers.join('、')}
                </p>
              </>
            ) : (
              <>
                <p className={styles.placeholder}>等待抽取分享人和主题...</p>
                <p className={styles.remainingInfo}>
                  待分享：{remainingSpeakers.join('、')}
                </p>
              </>
            )}
          </div>

          <button 
            className={`${styles.drawButton} ${isDrawing ? styles.drawing : ''}`}
            onClick={drawTopic}
            disabled={isDrawing || remainingSpeakers.length === 0}
          >
            {isDrawing ? '抽取中...' : remainingSpeakers.length === 0 ? '抽签结束' : '开始抽签'}
          </button>
        </div>
      </section>

      {/* 规则说明区 */}
      <section className={styles.rulesSection} id="rules">
        <div className={styles.container}>
          <h2>规则说明</h2>
          <div className={styles.ruleCards}>
            <div className={styles.ruleCard}>
              <div className={styles.ruleIcon}>⏱️</div>
              <h3>时间控制</h3>
              <p>准备：2分钟<br/>分享：自定</p>
            </div>
            <div className={styles.ruleCard}>
              <div className={styles.ruleIcon}>🎯</div>
              <h3>评分标准</h3>
              <p>主题理解<br/>案例分享<br/>观点创新</p>
            </div>
            <div className={styles.ruleCard}>
              <div className={styles.ruleIcon}>📝</div>
              <h3>注意事项</h3>
              <p>可以查阅资料<br/>鼓励互动讨论<br/>分享个人观点</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
