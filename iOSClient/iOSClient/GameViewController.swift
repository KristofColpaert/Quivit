//
//  GameViewController.swift
//  iOSClient
//
//  Created by Bart Callant on 19/11/15.
//  Copyright © 2015 Bart Callant. All rights reserved.
//

import UIKit
import Socket_IO_Client_Swift
import SwiftyJSON

class GameViewController: UIViewController, EILIndoorLocationManagerDelegate
{
	@IBOutlet weak var indoorLocationView: EILIndoorLocationView!
	
	var ipAddress:String?
	var port:String?
	var match:JSON?
	var selectedTeam:JSON?
	var selectedPlayer:JSON?
	
	var location:EILLocation?
	let indoorLocationManager = EILIndoorLocationManager()
	let appID = "quivit-cw1"
	let appToken = "f157d0a442bf7fe7815ffd53076492cc"
	var socket:SocketIOClient?
	
	override func viewDidLoad()
	{
		super.viewDidLoad()
		// Do any additional setup after loading the view, typically from a nib.
		
		ESTConfig.setupAppID(appID, andAppToken: appToken)
		ESTConfig.isAuthorized()
		
		self.indoorLocationManager.delegate = self
		
		if let ipAddress = ipAddress, port = port, m = match, _ = selectedTeam, _ = selectedPlayer
		{
			print(m["estimoteLocationId"])
			
			let request = EILRequestFetchLocation(locationIdentifier: m["estimoteLocationId"].string)
			request.sendRequestWithCompletion({(location, error) in
				self.location = location
				self.indoorLocationView.drawLocation(location)
				self.indoorLocationManager.startPositionUpdatesForLocation(location)
			})
			
			
			self.socket = SocketIOClient(socketURL: "http://\(ipAddress):\(port)")
			self.socket!.on("connect") {data, ack in
				print("[Socket] Connected")
			}
			self.socket!.connect()
			
			print("unwrapping complete")
		}
		else
		{
			let alertController = UIAlertController(title: "No match selected!", message: "Please select a match first!", preferredStyle: .Alert)
			
			let okAction = UIAlertAction(title: "Ok", style: .Default) { (action) in }
			alertController.addAction(okAction)
			
			self.presentViewController(alertController, animated: true) { }
		}
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
	
	func indoorLocationManager(manager: EILIndoorLocationManager!, didUpdatePosition position: EILOrientedPoint!, withAccuracy positionAccuracy: EILPositionAccuracy, inLocation location: EILLocation!)
	{
		print("[IndoorLocationManager] Player: \(self.selectedPlayer!)")
		print("[IndoorLocationManager] Position: x:\(position.x) y:\(position.y) orientation:\(position.orientation)")
		print("[IndoorLocationManager] Location: \(location.name)")
		
		self.indoorLocationView.updatePosition(position)
		
		let eli = self.match!["estimoteLocationId"].string!
		let pi = self.selectedPlayer!["_id"].string!
		let ti = self.selectedPlayer!["teamId"].string!
		let gi = self.match!["_id"].string!
		
		// msgObject.x, msgObject.y, msgObject.orientation, msgObject.timestamp, msgObject.estimoteLocationId, msgObject.playerId, msgObject.teamId, msgObject.gameId
		self.socket!.emit("position", ["x": position.x, "y": position.y, "orientation": position.orientation, "timestamp": 0, "estimoteLocationId": eli, "playerId": pi, "teamId": ti, "gameId": gi])
	}
	
	func indoorLocationManager(manager: EILIndoorLocationManager!, didFailToUpdatePositionWithError error: NSError!)
	{
		print("[IndoorLocationManager] Did fail to update Position! Error: \(error)")
	}
}