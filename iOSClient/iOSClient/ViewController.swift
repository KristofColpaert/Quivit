//
//  ViewController.swift
//  iOSClient
//
//  Created by Bart Callant on 19/11/15.
//  Copyright © 2015 Bart Callant. All rights reserved.
//

import UIKit
import Socket_IO_Client_Swift

// App ID : quivit-cw1
// App Token : f157d0a442bf7fe7815ffd53076492cc

class ViewController: UIViewController, ESTIndoorLocationManagerDelegate
{
	@IBOutlet weak var statusButton: UIBarButtonItem!
	@IBOutlet weak var changeStatusButton: UIBarButtonItem!
	@IBOutlet weak var gameStatusButton: UIBarButtonItem!
	@IBOutlet weak var indoorLocationView: ESTIndoorLocationView!
	
	let activityIndicator = UIActivityIndicatorView(activityIndicatorStyle: .Gray)
	
	let socket = SocketIOClient(socketURL: "http://192.168.0.192:3000")
	var i = 0
	var location:ESTLocation?
	var locations:[ESTLocation] = []
	let indoorLocationManager = ESTIndoorLocationManager()
	let appID = "quivit-cw1"
	let appToken = "f157d0a442bf7fe7815ffd53076492cc"
	var playing = false
	
	@IBAction func emitHandler(sender: AnyObject)
	{
		self.i++
		self.socket.emit("TEST", "iOS")
		self.socket.emit("NewPosition", ["PlayerName": "bart iOS App", "Position": ["x": i, "y": i]])
	}
	override func viewDidLoad()
	{
		super.viewDidLoad()
		// Do any additional setup after loading the view, typically from a nib.
		
		ESTConfig.setupAppID(appID, andAppToken: appToken)
		ESTConfig.isAuthorized()
		
		self.addHandlers()
		self.socket.connect()
		
		//createRoom()
		
		self.indoorLocationManager.delegate = self
		self.indoorLocationManager.fetchUserLocationsWithSuccess(
			{ (response) in
				self.locations = response as! [ESTLocation]
				if let bartsroom = self.locations.filter({ $0.identifier == "bart-s-room" }).first
				{
					self.location = bartsroom
					self.indoorLocationView.drawLocation(self.location)
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
		//self.activityIndicator.startAnimating()
		self.navigationItem.leftBarButtonItems?.append(UIBarButtonItem(customView: self.activityIndicator))
		
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
		
		//start location drawing
		//self.indoorLocationView.drawLocation(location)
	}
	override func viewWillDisappear(animated: Bool)
	{
		self.socket.disconnect()
		self.indoorLocationManager.stopIndoorLocation()
	}
	
	func addHandlers()
	{
		//self.socket.onAny{print("got event: \($0.event) with items \($0.items)")}

		self.socket.on("connect") {data, ack in
			print("[Socket] Connected")
			self.socket.emit("UserConnect", "Bart iOSApp")
			self.changeStatus(true)
		}
		
		self.socket.on("reconnect") {data, ack in
			print("[Socket] Disconnected")
			self.changeStatus(false)
		}
		
		self.socket.on("disconnect") {data, ack in
			print("[Socket] Disconnected")
			self.changeStatus(false)
		}
	}
	
	@IBAction func changeStatusButton(sender: AnyObject)
	{
		self.changeStatusButton.enabled = false
		self.statusButton.title == "Connected" ? self.socket.disconnect() : self.socket.connect()
	}
	
	func changeStatus(status: Bool)
	{
		if status
		{
			// rgba(46, 204, 113,1.0)
			//self.navigationController!.navigationBar.barTintColor = UIColor(red: (1/255)*46, green: (1/255)*204, blue: (1/255)*113, alpha: 1.0)
			self.navigationController!.navigationBar.barTintColor = UIColor.greenColor()
			self.navigationController!.navigationBar.barStyle = UIBarStyle.Default
			self.navigationItem.prompt = "Socket Connected!"
//			self.statusButton.title = "Connected"
//			self.changeStatusButton.title = "Disconnect"
		}
		else
		{
			// rgba(192, 57, 43,1.0)
			//self.navigationController!.navigationBar.barTintColor = UIColor(red: (1/255)*192, green: (1/255)*57, blue: (1/255)*43, alpha: 1.0)
			self.navigationController!.navigationBar.barTintColor = UIColor.redColor()
			self.navigationController!.navigationBar.barStyle = UIBarStyle.Black
			self.navigationItem.prompt = "Socket Disconnected!"
//			self.statusButton.title = "Disconnected"
//			self.changeStatusButton.title = "Connect"
		}
		self.changeStatusButton.enabled = true
	}
	
	@IBAction func changeGameButton(sender: AnyObject)
	{
		if self.playing
		{
			self.indoorLocationManager.stopIndoorLocation()
			//self.navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .Play, target: self, action: "changeGameButton")
			self.playing = false
		}
		else
		{
			self.indoorLocationManager.startIndoorLocation(self.location)
			//self.navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .Pause, target: self, action: "changeGameButton")
			self.playing = true
		}
		
	}
	
	/*
	func createRoom()
	{
		let beacon1 = "EBE0B368FB84" // Kristof BlueBerry
		let beacon2 = "F112A89006B5" // Kristof Ice
		let beacon3 = "C324FBC6DDDC" // Kristof Mint
		let beacon4 = "C8EA6D70E045" // blueberry
		
		let length = 608.0
		let width = 393.0
		let orientation = 71.0
		
		let locationBuilder = ESTLocationBuilder()
		
		locationBuilder.setLocationBoundaryPoints([ESTPoint(x: 0, y: 0), ESTPoint(x: 0, y: width), ESTPoint(x: length, y: width), ESTPoint(x: length, y: 0)])
		locationBuilder.setLocationOrientation(orientation)
		
		locationBuilder.addBeaconIdentifiedByMac(beacon1, atBoundarySegmentIndex: 0, inDistance: width / 2, fromSide: .LeftSide)
		locationBuilder.addBeaconIdentifiedByMac(beacon2, atBoundarySegmentIndex: 1, inDistance: length / 2, fromSide: .LeftSide)
		locationBuilder.addBeaconIdentifiedByMac(beacon3, atBoundarySegmentIndex: 2, inDistance: width / 2, fromSide: .RightSide)
		locationBuilder.addBeaconIdentifiedByMac(beacon4, atBoundarySegmentIndex: 3, inDistance: length / 2, fromSide: .RightSide)
		
		self.location = locationBuilder.build()
		
		self.indoorLocationManager.delegate = self
	}
	*/
	
	func indoorLocationManagerIsReady(manager: ESTIndoorLocationManager!) {
		print("[IndoorLocationManager] Ready")
	}
	/*
	func indoorLocationManager(manager: ESTIndoorLocationManager!, didUpdatePosition position: ESTOrientedPoint!, inLocation location: ESTLocation!)
	{
		print("[IndoorLocationManager] Position: x:\(position.x) y:\(position.y) orientation:\(position.orientation)")
		print("[IndoorLocationManager] Location: \(location.name)")
		
		self.indoorLocationView.updatePosition(position)
	}
	*/
	
	func indoorLocationManager(manager: ESTIndoorLocationManager!, didUpdatePosition position: ESTOrientedPoint!, withAccuracy positionAccuracy: ESTPositionAccuracy, inLocation location: ESTLocation!)
	{
		print("[IndoorLocationManager] Position: x:\(position.x) y:\(position.y) orientation:\(position.orientation)")
		print("[IndoorLocationManager] PositionAccuracy: \(positionAccuracy)")
		print("[IndoorLocationManager] Location: \(location.name)")
		
		self.indoorLocationView.updatePosition(position)
	}
	func indoorLocationManager(manager: ESTIndoorLocationManager!, didFailToUpdatePositionWithError error: NSError!) {
		print("[IndoorLocationManager] Did fail to update Position! Error: \(error)")
	}
	
	@IBAction func chooseRoomHandler(sender: AnyObject)
	{
		let alertController = UIAlertController(title: "Choose Room", message: nil, preferredStyle: .ActionSheet)
		
		let cancelAction = UIAlertAction(title: "Cancel", style: .Cancel) { (action) in
			// ...
		}
		alertController.addAction(cancelAction)
		
		for location in self.locations
		{
			let action = UIAlertAction(title: location.name, style: .Default, handler: { (action) in
				self.location = location
				self.indoorLocationView.drawLocation(self.location)
			})
			alertController.addAction(action)
		}
		
		self.presentViewController(alertController, animated: true) {
			// ...
		}
	}
}