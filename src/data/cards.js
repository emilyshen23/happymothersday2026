import sweetMom from '../assets/images/sweet-mom.png'
import chefMom from '../assets/images/chef-mom.png'
import exerciseMom from '../assets/images/exercise-mom.png'
import goofyMom from '../assets/images/goofy-mom.png'

import playSweet from '../assets/images/play-sweet.png'
import playChef from '../assets/images/play-chef.png'
import playExercise from '../assets/images/play-exercise.png'
import playGoofy from '../assets/images/play-goofy.png'

import pauseSweet from '../assets/images/pause-sweet.png'
import pauseChef from '../assets/images/pause-chef.png'
import pauseExercise from '../assets/images/pause-exercise.png'
import pauseGoofy from '../assets/images/pause-goofy.png'

import voice1 from '../assets/audio/voice1.m4a'
import voice2 from '../assets/audio/voice2.m4a'
import voice3 from '../assets/audio/voice3.m4a'
import voice4 from '../assets/audio/voice4.m4a'

const cards = [
  {
    id: 'sweet',
    title: '暖心妈',
    catchphrase: '"吃饭了吗?"',
    accent: '#917256',
    colors: {
      bg: '#fbf1e3',
      border: '#d0c1aa',
      strong: '#48290d',
      muted: 'rgba(72,41,13,0.4)',
    },
    illustration: sweetMom,
    playIcon: playSweet,
    pauseIcon: pauseSweet,
    audio: voice1,
    duration: 9,
    durationLabel: '0:09',
    transcript: '妈妈, 我最喜欢你关心人的方式, 总是问我们问题, 经常问你吃饭了吗?',
  },
  {
    id: 'chef',
    title: '家常妈',
    catchphrase: '"我在家都可以做"',
    accent: '#7A5C3E',
    colors: {
      bg: '#fdede5',
      border: 'rgba(163,83,44,0.4)',
      strong: '#a14a23',
      muted: 'rgba(161,74,35,0.4)',
    },
    illustration: chefMom,
    playIcon: playChef,
    pauseIcon: pauseChef,
    audio: voice2,
    duration: 10,
    durationLabel: '0:10',
    transcript: '哎呀妈妈, 我好想念你做的家常菜和点心, 下次我回家, 我们一起吃cheesecake吧!',
  },
  {
    id: 'exercise',
    title: '运动妈',
    catchphrase: '"跟我一起走路吗?"',
    accent: '#6B7B5E',
    colors: {
      bg: '#fffcf6',
      border: 'rgba(121,109,83,0.4)',
      strong: '#796d53',
      muted: 'rgba(121,109,83,0.4)',
    },
    illustration: exerciseMom,
    playIcon: playExercise,
    pauseIcon: pauseExercise,
    audio: voice3,
    duration: 7,
    durationLabel: '0:07',
    transcript: '加油, 妈妈！等我回去陪你一起去Ashley Falls公园暴走！',
  },
  {
    id: 'goofy',
    title: '傻妈',
    catchphrase: '"脸怎么又胖了?!"',
    accent: '#B07A6E',
    colors: {
      bg: '#fbf9fa',
      border: 'rgba(162,116,123,0.4)',
      strong: '#a9646f',
      muted: 'rgba(162,116,123,0.4)',
    },
    illustration: goofyMom,
    playIcon: playGoofy,
    pauseIcon: pauseGoofy,
    audio: voice4,
    duration: 10,
    durationLabel: '0:10',
    transcript: '妈妈妈妈, 你这个笑容又暖又好看, 脸不胖, 千万别不自信啊！',
  },
]

export default cards
