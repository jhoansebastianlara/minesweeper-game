import {storageImageCities, storageRef} from '@/firebase'
import {CONSTANTS} from '@/shared/constants'
import types from '@/store/types'

const state = {
  imageUploadProcess: {
    isUploading: false,
    progressUpload: 0,
    didUploadFinish: false
  }
}

const getters = {
  [types.storageFiles.getters.getImageUploadProcess]: state => {
    return state.imageUploadProcess
  }
}

const mutations = {
  [types.storageFiles.mutations.setImageUploadProgress] (state, {progress}) {
    state.imageUploadProcess.progressUpload = progress

    if (progress > 0 || progress <= 100) {
      state.imageUploadProcess.isUploading = true
    } else {
      state.imageUploadProcess.isUploading = false
      state.imageUploadProcess.progressUpload = 0
    }

    if (progress === 100) {
      state.imageUploadProcess.didUploadFinish = true
      // wait miliseconds and reset the state
      setTimeout(() => {
        state.imageUploadProcess = {
          isUploading: false,
          progressUpload: 0,
          didUploadFinish: false
        }
      }, 500)
    }
  }
}

const actions = {
  [types.storageFiles.actions.uploadImage]: ({state, commit}, {data, callback}) => {
    console.log('uploading......')

    if (state.imageUploadProcess.isUploading) {
      callback(null, {success: false, anotheImageUploading: true})
      return
    }

    let metadata = {
      contentType: 'image/jpeg'
    }
    let imageName = data.name + '.jpeg'
    let uploadTask = storageImageCities.child(imageName).put(data.file, metadata)

    uploadTask.on('state_changed', (snapshot) => {
      // Get task progress, including the number of bytes uploaded and
      // the total number of bytes to be uploaded
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
      commit(types.storageFiles.mutations.setImageUploadProgress, {progress})
    }, (error) => {
      console.log('error uploading image!')
      console.log(error)

      let msgErrorI18n
      // Handle unsuccessful uploads
      switch (error.code) {
        case CONSTANTS.FIREBASE.ERRORS.STORAGE.UNKNOWN:
          msgErrorI18n = 'global.something_wrong_error'
          break
        case CONSTANTS.FIREBASE.ERRORS.STORAGE.UNAUTHENTICATED:
          msgErrorI18n = 'global.something_wrong_error'
          break
        case CONSTANTS.FIREBASE.ERRORS.STORAGE.UNAUTHORIZED:
          msgErrorI18n = 'global.something_wrong_error'
          break
        case CONSTANTS.FIREBASE.ERRORS.STORAGE.RETRY_LIMIT_EXCEEDED:
          msgErrorI18n = 'global.something_wrong_error'
          break
        case CONSTANTS.FIREBASE.ERRORS.STORAGE.CANCELED:
          msgErrorI18n = 'global.something_wrong_error'
          break
        default:
          msgErrorI18n = 'global.something_wrong_error'
      }

      callback({error: error, msgErrorI18n})
    }, () => {
      // Handle successful uploads on complete
      let imageUrl = uploadTask.snapshot.downloadURL
      let fullPath = uploadTask.snapshot.metadata.fullPath
      let name = uploadTask.snapshot.metadata.name

      callback(null, {
        success: true,
        data: {
          imageUrl,
          name,
          fullPath
        }
      })
    })
  },

  [types.storageFiles.actions.getDownloadURLFromPath]: ({state}, {path}) => {
    return new Promise((resolve, reject) => {
      storageRef.child(path).getDownloadURL().then(url => {
        resolve(url)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
