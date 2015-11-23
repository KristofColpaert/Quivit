//
//  GameViewController.swift
//  iOSClient
//
//  Created by Bart Callant on 19/11/15.
//  Copyright © 2015 Bart Callant. All rights reserved.
//

import UIKit
import Socket_IO_Client_Swift

class GameViewController: UIViewController, EILIndoorLocationManagerDelegate
{
	@IBOutlet weak var indoorLocationView: EILIndoorLocationView!
	
	let appDelegate = UIApplication.sharedApplication().delegate as! AppDelegate
	var location:EILLocation?
	let indoorLocationManager = EILIndoorLocationManager()
	let appID = "quivit-cw1"
	let appToken = "f157d0a442bf7fe7815ffd53076492cc"
	
	override func viewDidLoad()
	{
		super.viewDidLoad()
		// Do any additional setup after loading the view, typically from a nib.
		
		ESTConfig.setupAppID(appID, andAppToken: appToken)
		ESTConfig.isAuthorized()
		
		self.indoorLocationManager.delegate = self
		
		let request = EILRequestFetchLocation(locationIdentifier: "bart-s-room")
		request.sendRequestWithCompletion({(location, error) in
			self.location = location
			self.indoorLocationView.drawLocation(location)
			self.indoorLocationManager.startPositionUpdatesForLocation(location)
		})
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
		self.indoorLocationManager.stopPositionUpdates()
	}

	func indoorLocationManagerIsReady(manager: EILIndoorLocationManager!) {
		print("[IndoorLocationManager] Ready")
	}
	
	func indoorLocationManager(manager: EILIndoorLocationManager!, didUpdatePosition position: EILOrientedPoint!, inLocation location: EILLocation!)
	{
		print("[indoorLocationManager] Player: \(self.appDelegate.selectedPlayer!)")
		print("[IndoorLocationManager] Position: x:\(position.x) y:\(position.y) orientation:\(position.orientation)")
		print("[IndoorLocationManager] Location: \(location.name)")
		
		self.indoorLocationView.updatePosition(position)
		
		self.appDelegate.socket!.emit("NewPosition", ["Team": self.appDelegate.selectedTeam!, "Player": self.appDelegate.selectedPlayer!, "Position": ["x": position.x, "y": position.y, "orientation": position.orientation], "Location": location.name])
	}
	/*
	func indoorLocationManager(manager: EILIndoorLocationManager!, didUpdatePosition position: EILOrientedPoint!, withAccuracy positionAccuracy: EILPositionAccuracy, inLocation location: EILLocation!)
	{
		print("[IndoorLocationManager] Position: x:\(position.x) y:\(position.y) orientation:\(position.orientation)")
		print("[IndoorLocationManager] PositionAccuracy: \(positionAccuracy)")
		print("[IndoorLocationManager] Location: \(location.name)")
		
		self.indoorLocationView.updatePosition(position)
	}
	*/
	func indoorLocationManager(manager: EILIndoorLocationManager!, didFailToUpdatePositionWithError error: NSError!) {
		print("[IndoorLocationManager] Did fail to update Position! Error: \(error)")
	}
}