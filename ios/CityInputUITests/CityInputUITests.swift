//
//  CityInputUITests.swift
//  CityInputUITests
//
//  Created by Adriaan Marain on 20/04/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import XCTest

class CityInputUITests: XCTestCase {
        
    override func setUp() {
        super.setUp()
        
        // Put setup code here. This method is called before the invocation of each test method in the class.
        
        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false
        // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
        XCUIApplication().launch()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testExample() {
        // Use recording to get started writing UI tests.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
      XCUIApplication()/*@START_MENU_TOKEN@*/.otherElements["Nieuw "]/*[[".otherElements.matching(identifier: \"My Location Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Legal In progress Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin  Nieuw \").otherElements[\"Nieuw \"]",".otherElements[\"Nieuw \"]"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.tap()
      XCUIApplication()/*@START_MENU_TOKEN@*/.otherElements["Nieuw "]/*[[".otherElements.matching(identifier: \"My Location Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Legal In progress Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin Map pin  Nieuw \").otherElements[\"Nieuw \"]",".otherElements[\"Nieuw \"]"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.tap()


      
      
    }
    
}
