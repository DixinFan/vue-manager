import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import BasicTable from '@/pages/BasicTable'
import EditableTable from '@/pages/EditableTable'
import Widget from '@/pages/Widget'
import Panels from '@/pages/Panels'
import Editor from '@/pages/Editor'
import ImageList from '@/pages/ImageList'
import Charts from '@/pages/Charts'
import Login from '@/pages/Login'
import LockScreen from '@/pages/LockScreen'
import Loading from '@/pages/Loading'
import UploadVideo from '@/pages/UploadVideo'
import VideoPlay from '@/pages/VideoPlay'
import PlayPage from '@/pages/PlayPage'
import RecognizedVideo from '@/pages/RecognizedVideo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // path: '/',
      path: '/HomePage',
      component: Home,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'VideoPlay',
          name: 'VideoPlay',
          component: VideoPlay
        },
        {
          path: 'RecognizedVideo',
          name: 'RecognizedVideo',
          component: RecognizedVideo
        },
        {
          path: 'widget',
          name: 'Widget',
          component: Widget
        },
        {
          path: 'panels',
          name: 'Panels',
          component: Panels
        },
        {
          path: 'editor',
          name: 'Editor',
          component: Editor
        },
        {
          path: 'imagelist',
          name: 'ImageList',
          component: ImageList
        },
        {
          path: 'basic-table',
          name: 'BasicTable',
          component: BasicTable
        },
        {
          path: 'editable-table',
          name: 'EditableTable',
          component: EditableTable
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        }
      ]
    },
    {
      // path: '/login',
      path: '/',
      name: 'Login',
      components: {
        blank: Login
      }
    },
    {
      path: '/lockscreen',
      name: 'Lockscreen',
      components: {
        blank: LockScreen
      }
    },
    {
      path: '/loading',
      name: 'Loading',
      components: {
        blank: Loading
      }
    },
    {
      path: '/UploadVideo',
      name: 'UploadVideo',
      components: {
        blank: UploadVideo
      }
    },
    {
      path: '/PlayPage',
      name: 'PlayPage',
      components: {
        blank: PlayPage
      }
    }
  ]
})
