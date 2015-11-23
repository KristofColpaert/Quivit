//
//  GameViewController.swift
//  iOSClient
//
//  Created by Bart Callant on 19/11/15.
//  Copyright © 2015 Bart Callant. All rights reserved.
//

import UIKit
import Socket_IO_Client_Swift

// App ID : quivit-cw1
// App Token : f157d0a442bf7fe7815ffd53076492cc

class GameViewController: UIViewController, ESTIndoorLocationManagerDelegate
{
	@IBOutlet weak var indoorLocationView: ESTIndoorLocationView!
	
	let appDelegate = UIApplication.sharedApplication().delegate as! AppDelegate
	var location:ESTLocation?
	let indoorLocationManager = ESTIndoorLocationManager()
	let appID = "quivit-cw1"
	let appToken = "f157d0a442bf7fe7815ffd53076492cc"
//	var playing = false
	
	override func viewDidLoad()
	{
		super.viewDidLoad()
		// Do any additional setup after loading the view, typically from a nib.
		
		ESTConfig.setupAppID(appID, andAppToken: appToken)
		ESTConfig.isAuthorized()
		
		self.indoorLocationManager.delegate = self
		self.indoorLocationManager.fetchUserLocationsWithSuccess(
			{ (response) in
				let locations = response as! [ESTLocation]
				if let bartsroom = locations.filter({ $0.identifier == "bart-s-room" }).first
				{
					self.location = bartsroom
					self.indoorLocationView.drawLocation(self.location)
					self.indoorLocationManager.startIndoorLocation(self.location)
				}
				else
				{
					print("location not found")
				}
			},
			failure:
			{ (error) in
				print("error when fetching locations: \(error)")
			}
		)
	}
	
	override func viewWillAppear(animated: Bool)
	{
		self.indoorLocationView.backgroundColor = UIColor.clearColor()
		self.indoorLocationView.showTrace = true
		self.indoorLocationView.showWallLengthLabels = true
		self.indoorLocationView.rotateOnPositionUpdate = false
		
		self.indoorLocationView.locationBorderColor = UIColor.blackColor()
		self.indoorLocationView.locationBorderThickness = 6
		self.indoorLocationView.doorColor = UIColor.brownColor()
		self.indoorLocationView.doorThickness = 5
		self.indoorLocationView.traceColor = UIColor.yellowColor()
		self.indoorLocationView.traceThickness = 2
		self.indoorLocationView.wallLengthLabelsColor = UIColor.blackColor()
	}
	override func viewWillDisappear(animated: Bool)
	{
		self.indoorLocationManager.stopIndoorLocation()
	}


	func indoorLocationManagerIsReady(manager: ESTIndoorLocationManager!) {
		print("[IndoorLocationManager] Ready")
	}
	
	func indoorLocationManager(manager: ESTIndoorLocationManager!, didUpdatePosition position: ESTOrientedPoint!, inLocation location: ESTLocation!)
	{
		print("[indoorLocationManager] Player: \(self.appDelegate.selectedPlayer!)")
		print("[IndoorLocationManager] Position: x:\(position.x) y:\(position.y) orientation:\(position.orientation)")
		print("[IndoorLocationManager] Location: \(location.name)")
		
		self.indoorLocationView.updatePosition(position)
		
		self.appDelegate.socket!.emit("NewPosition", ["Team": self.appDelegate.selectedTeam!, "Player": self.appDelegate.selectedPlayer!, "Position": ["x": position.x, "y": position.y, "orientation": position.orientation], "Location": location.name])
	}
	/*
	func indoorLocationManager(manager: ESTIndoorLocationManager!, didUpdatePosition position: ESTOrientedPoint!, withAccuracy positionAccuracy: ESTPositionAccuracy, inLocation location: ESTLocation!)
	{
		print("[IndoorLocationManager] Position: x:\(position.x) y:\(position.y) orientation:\(position.orientation)")
		print("[IndoorLocationManager] PositionAccuracy: \(positionAccuracy)")
		print("[IndoorLocationManager] Location: \(location.name)")
		
		self.indoorLocationView.updatePosition(position)
	}
	*/
	func indoorLocationManager(manager: ESTIndoorLocationManager!, didFailToUpdatePositionWithError error: NSError!) {
		print("[IndoorLocationManager] Did fail to update Position! Error: \(error)")
	}
}