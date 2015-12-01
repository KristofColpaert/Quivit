//
//  MatchTableViewController.swift
//  iOSClient
//
//  Created by Bart Callant on 30/11/15.
//  Copyright © 2015 Bart Callant. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON

class MatchTableViewController: UITableViewController
{
	var ipAddress:String?
	var port:String?
	var matches:JSON = []
	
    override func viewDidLoad()
	{
        super.viewDidLoad()
		
		self.refreshControl = UIRefreshControl()
		self.refreshControl!.addTarget(self, action: "refresh:", forControlEvents: UIControlEvents.ValueChanged)
		self.tableView.addSubview(refreshControl!)
		
		if let _ = ipAddress, _ = port
		{
			self.refreshControl!.beginRefreshing()
			refresh("")
		}
		else
		{
			let alertController = UIAlertController(title: "No IP address or port provided!", message: "Please provide an IP address and a port first!", preferredStyle: .Alert)
			
			let okAction = UIAlertAction(title: "Ok", style: .Default) { (action) in }
			alertController.addAction(okAction)
			
			self.presentViewController(alertController, animated: true) { }
		}
    }
	
	func refresh(sender:AnyObject)
	{
		UIApplication.sharedApplication().networkActivityIndicatorVisible = true
		
		let ipAddress = self.ipAddress!
		let port = self.port!
		
		print("[MatchTVC] IP: \(ipAddress) PORT: \(port)")
		
		Alamofire.request(.GET, "http://\(ipAddress):\(port)/api/game").responseJSON { response in
			//print(response.request)  // original URL request
			//print(response.response) // URL response
			//print(response.data)     // server data
			//print(response.result)   // result of response serialization
			
			print("[MatchTVC] .GET Request Succes")
			
			let matches = JSON(data: response.data!)
			
			if matches.count > 0
			{
				print("[MatchTVC] Matches Available")
				
				//print("JSON: \(matches)")

				self.matches = matches
				self.tableView.reloadData()
			}
			else
			{
				print("[MatchTVC] No Matches Available")
				
				let alertController = UIAlertController(title: "No matches found!", message: "Currently there are no matches available!", preferredStyle: .Alert)
				
				let okAction = UIAlertAction(title: "Ok", style: .Default) { (action) in }
				alertController.addAction(okAction)
				
				self.presentViewController(alertController, animated: true) { }
			}
			
			UIApplication.sharedApplication().networkActivityIndicatorVisible = false
			self.refreshControl!.endRefreshing()
		}
	}

    // MARK: - Table view data source

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int
	{
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int
	{
        // #warning Incomplete implementation, return the number of rows
        return self.matches.count
    }

    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell
	{
        let cell = tableView.dequeueReusableCellWithIdentifier("MatchCell", forIndexPath: indexPath)
		let match = self.matches[indexPath.row]
		
        // Configure the cell...
		cell.textLabel?.text = match["teamHomeId"].string
		cell.detailTextLabel?.text = match["estimoteLocationId"].string

        return cell
    }

	var currentSelected:NSIndexPath?
	override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath)
	{
		if let cs = self.currentSelected
		{
			let cell = self.tableView.cellForRowAtIndexPath(cs)
			cell?.accessoryType = .None
		}
		
		let cell = self.tableView.cellForRowAtIndexPath(indexPath)
		cell?.accessoryType = .Checkmark
		
		self.currentSelected = indexPath
	}

    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?)
	{
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
		
		if segue.identifier == "seguePlayerTVC"
		{
			if let cs = self.currentSelected
			{
				let vc = segue.destinationViewController as! PlayerTableViewController
				vc.ipAddress = ipAddress
				vc.port = port
				vc.match = self.matches[cs.row]
			}
			else
			{
				let alertController = UIAlertController(title: "No match selected!", message: "Please select a match first!", preferredStyle: .Alert)
				
				let okAction = UIAlertAction(title: "Ok", style: .Default) { (action) in }
				alertController.addAction(okAction)
				
				self.presentViewController(alertController, animated: true) { }
			}
		}
    }

}
