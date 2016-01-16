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
	var host = "quivit.herokuapp.com"
	var port = "80"
	var matches:JSON = []
	
    override func viewDidLoad()
	{
        super.viewDidLoad()
		
		self.refreshControl = UIRefreshControl()
		self.refreshControl!.addTarget(self, action: "refresh:", forControlEvents: UIControlEvents.ValueChanged)
		self.tableView.addSubview(refreshControl!)
    }
	
	func refresh(sender:AnyObject)
	{
		Quivit.getMatches(self.host, port: self.port, completionHandler: {(responseObject:JSON?, error:NSError?) in
			
			if let matches = responseObject
			{
				print("[MatchesTVC] Matches Available")
				self.matches = matches
				self.tableView.reloadData()
			}
			else if let _ = error { Quivit.showAlert(self, title: "Unable to connect!", message: "Could not connect to server. Check the host and the port, then try again.") }
			else { Quivit.showAlert(self, title: "Someting went wrong!", message: "Please try again.") }
		})
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
		cell.textLabel?.text = "\(match["teamHome", "name"].stringValue) - \(match["teamAway", "name"].stringValue)"
		
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
				vc.host = host
				vc.port = port
				vc.match = self.matches[cs.row]
			}
			else { Quivit.showAlert(self, title: "No match selected!", message: "Please select a match first!") }
		}
    }
}