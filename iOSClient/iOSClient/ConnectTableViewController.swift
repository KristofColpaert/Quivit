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
	var advanced = false
	var host = "quivit.herokuapp.com"
	var port = "80"
	var matches:JSON = []
	
	@IBOutlet weak var inputIPAddress: UITextField!
	@IBOutlet weak var inputPort: UITextField!
	@IBOutlet weak var hostCell: UITableViewCell!
	
	override func viewDidLoad()
	{
        super.viewDidLoad()
    }
	
	override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
		if advanced	{ return 2 }
		return 1
	}
	
	@IBAction func switchConfigurationViewHandler(sender: UISwitch)
	{
		self.advanced = sender.on
		self.tableView.reloadData()
	}
	
	func showActivityIndicator()
	{
		let overlayView = UIView(frame: UIScreen.mainScreen().bounds)
		overlayView.tag = 1111
		overlayView.backgroundColor = UIColor(red: 0, green: 0, blue: 0, alpha: 0.5)
		let activityIndicator = UIActivityIndicatorView(activityIndicatorStyle: .WhiteLarge)
		activityIndicator.center = overlayView.center
		overlayView.addSubview(activityIndicator)
		activityIndicator.startAnimating()
		self.navigationController?.view.addSubview(overlayView)
	}
	
	func hideActivityIndicator()
	{
		let subviews = self.navigationController?.view.subviews
		for subview in subviews!
		{
			if subview.tag == 1111 { subview.removeFromSuperview() }
		}
	}
	
	@IBAction func connectHandler(sender: AnyObject)
	{
		self.showActivityIndicator()
		
		if self.advanced
		{
			if let h = inputIPAddress.text where h != "" { self.host = h }
			if let p = inputPort.text where p != "" { self.port = p }
		}
		
		Quivit.getMatches(self.host, port: self.port, completionHandler: {(responseObject:JSON?, error:NSError?) in
			
			self.hideActivityIndicator()
			
			if let matches = responseObject
			{
				self.matches = matches
				self.performSegueWithIdentifier("segueMatchTVC", sender: nil)
			}
			else if let _ = error
			{
				Quivit.showAlert(self, title: "Unable to connect!", message: "Could not connect to server. Check the host and the port, then try again.")
			}
			else
			{
				Quivit.showAlert(self, title: "Someting went wrong!", message: "Please try again.")
			}
		})
	}
	

    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?)
	{
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
		
		if segue.identifier == "segueMatchTVC"
		{
			print("[ConnectTVC] Segue to MatchTVC")
			
			let vc = segue.destinationViewController as! MatchTableViewController
			vc.host = self.host
			vc.port = self.port
			vc.matches = self.matches
		}
    }
}