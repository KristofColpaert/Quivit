//
//  ConnectTableViewController.swift
//  iOSClient
//
//  Created by Bart Callant on 22/11/15.
//  Copyright © 2015 Bart Callant. All rights reserved.
//

import UIKit
import Socket_IO_Client_Swift

class ConnectTableViewController: UITableViewController
{
	let appDelegate = UIApplication.sharedApplication().delegate as! AppDelegate
	
	@IBOutlet weak var inputIPAddress: UITextField!
	@IBOutlet weak var inputPort: UITextField!
	@IBOutlet weak var aiConnectSocket: UIActivityIndicatorView!
	@IBOutlet weak var buttonConnectSocket: UIButton!
	
	override func viewDidLoad()
	{
        super.viewDidLoad()
		
		if let	serverIP = NSUserDefaults.standardUserDefaults().objectForKey("serverIP"),
				serverPort = NSUserDefaults.standardUserDefaults().objectForKey("serverPort")
		{
			inputIPAddress.text = serverIP as? String
			inputPort.text = serverPort as? String
		}
    }

	@IBAction func handlerConnectSocket(sender: AnyObject)
	{
		if let s = appDelegate.socket
		{
			s.disconnect()
		}
		
		aiConnectSocket.startAnimating()
		buttonConnectSocket.setTitle("Connecting...", forState: .Normal)
		buttonConnectSocket.enabled = false;
		
		var ipAddress = inputIPAddress.placeholder!
		var port = inputPort.placeholder!
		if let ip = inputIPAddress.text where ip != "" { ipAddress = ip }
		if let p = inputPort.text where p != "" { port = p }
		
		appDelegate.socket = SocketIOClient(socketURL: "http://\(ipAddress):\(port)")
		
		appDelegate.socket!.on("connect") {data, ack in
			print("[Socket] Connected")
			self.appDelegate.socket!.emit("UserConnect", "Bart iOSApp")
			//self.appDelegate.socket!.emit("NewPosition", ["Team": "KAA Gent", "Player": "Laurent Depoitre", "Position": ["x": 0.0, "y": 0.0, "orientation": 0.0], "Location": "TestLocation"])
		
			//self.aiConnectSocket.stopAnimating()
			self.buttonConnectSocket.setTitle("Connected!", forState: .Normal)
			//self.buttonConnectSocket.enabled = true;
			
			NSUserDefaults.standardUserDefaults().setObject(ipAddress, forKey: "serverIP")
			NSUserDefaults.standardUserDefaults().setObject(port, forKey: "serverPort")
		}
		
		appDelegate.socket!.on("teamInfo") {data, ack in
			print("[Socket] Team Info")
			print("[Socket] Team Info: \(data)")
			
			self.aiConnectSocket.stopAnimating()
			self.buttonConnectSocket.enabled = true;
			
			let hp = data[0].objectForKey("homeTeam")!.objectForKey("players") as! [String]
			let ap = data[0].objectForKey("awayTeam")!.objectForKey("players") as! [String]
			
			self.appDelegate.teams = [data[0].objectForKey("homeTeam")!.valueForKey("name") as! String, data[0].objectForKey("awayTeam")!.valueForKey("name") as! String]
			self.appDelegate.players = [hp, ap]
			
			self.navigationController?.performSegueWithIdentifier("seguePlayerTVC", sender: nil)
		}
		
		appDelegate.socket!.connect()
	}
	
    override func didReceiveMemoryWarning()
	{
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */
}