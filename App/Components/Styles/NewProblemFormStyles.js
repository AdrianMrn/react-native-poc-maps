import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: Metrics.section
  },
  header: {
    marginTop: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addImageButton: {
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: Colors.cityInputColor
  },
  imagePreview: {
    width: Metrics.screenWidth - Metrics.doubleBaseMargin * 2,
    height: Metrics.screenWidth - Metrics.doubleBaseMargin * 2,
  },
  imageAddSection: {
    marginVertical: Metrics.doubleBaseMargin,
    marginLeft: 15,
  },
  deleteImageContainer: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  deleteImageButton: {
    backgroundColor: '#14171a'
  },
  itemContainer:  {
    marginLeft: 15,
    marginTop: Metrics.doubleBaseMargin,
    /*  justifyContent: 'center',
     alignItems: 'center', */
  },
  textareaLabel: {
    color: '#575757',
    fontSize: 17,
  },
  textStyle: {
    padding: 5,
    paddingLeft: 0,
    fontSize: 17,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1
  },
  addressInput: {
    width: Metrics.screenWidth - 80
  },
  editIcon: {
    position: 'absolute',
    right: 5,
    top: 20,
  }
})
