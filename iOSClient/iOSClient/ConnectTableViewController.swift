//
//  ConnectTableViewController.swift
//  iOSClient
//
//  Created by Bart Callant on 22/11/15.
//  Copyright © 2015 Bart Callant. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON

class ConnectTableViewController: UITableViewController
{
	let appDelegate = UIApplication.sharedApplication().delegate as! AppDelegate
	
	@IBOutlet weak var inputIPAddress: UITextField!
	@IBOutlet weak var inputPort: UITextField!
	
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

    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?)
	{
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
		
		if segue.identifier == "segueMatchTVC"
		{
			var ipAddress = inputIPAddress.placeholder!
			var port = inputPort.placeholder!
			if let ip = inputIPAddress.text where ip != "" { ipAddress = ip }
			if let p = inputPort.text where p != "" { port = p }
			
			NSUserDefaults.standardUserDefaults().setObject(ipAddress, forKey: "serverIP")
			NSUserDefaults.standardUserDefaults().setObject(port, forKey: "serverPort")
			
			let vc = segue.destinationViewController as! MatchTableViewController
			vc.ipAddress = ipAddress
			vc.port = port
		}
    }
}