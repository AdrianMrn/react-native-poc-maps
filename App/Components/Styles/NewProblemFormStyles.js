import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: Metrics.section
  },
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
    marginTop: Metrics.doubleBaseMargin
  },
  buttonsContainer: {
    flexDirection: 'row',
    flex: 1
  },
  centered: {
    alignItems: 'center'
  },
  componentButton: {
    borderColor: Colors.border,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1
  },
  apiButton: {
    borderColor: Colors.border,
    borderRightWidth: 1,
    borderBottomWidth: 1
  },
  usageButton: {
    borderColor: Colors.border,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  deviceButton: {
    borderColor: Colors.border,
    borderRightWidth: 1,
    borderTopWidth: 1
  },
  sectionText: {
    textAlign: 'center',
    fontFamily: Fonts.base,
    fontSize: 14,
    marginHorizontal: Metrics.baseMargin,
    lineHeight: 30,
    marginVertical: Metrics.doubleBaseMargin,
    color: Colors.charcoal
  },
  submitButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  banner: {
    position: 'absolute',
    width: Metrics.screenWidth,
    backgroundColor: Colors.banner,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50
  },
  bannerLabel: {
    ...Fonts.style.h5,
    fontSize: 12,
    color: Colors.snow
  },
  imagePreview: {
    width: Metrics.screenWidth - Metrics.doubleBaseMargin*2,
    height: Metrics.screenWidth - Metrics.doubleBaseMargin*2,
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
  itemContainer: {
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
