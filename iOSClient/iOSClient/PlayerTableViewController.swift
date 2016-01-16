//
//  PlayerTableViewController.swift
//  iOSClient
//
//  Created by Bart Callant on 23/11/15.
//  Copyright © 2015 Bart Callant. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON

class PlayerTableViewController: UITableViewController
{
	var host:String?
	var port:String?
	var match:JSON?
	
	var teams:[JSON] = []
	var players:[JSON] = [[], []]
	
    override func viewDidLoad()
	{
        super.viewDidLoad()
		
		self.refreshControl = UIRefreshControl()
		self.refreshControl!.addTarget(self, action: "refresh:", forControlEvents: UIControlEvents.ValueChanged)
		self.tableView.addSubview(refreshControl!)

		if let _ = host, _ = port, m = match
		{
			teams = [m["teamHome", "name"], m["teamAway", "name"]]
			print(teams)
			self.refreshControl!.beginRefreshing()
			refresh("")
		}
		else
		{
			let alertController = UIAlertController(title: "No match selected!", message: "Please select a match first!", preferredStyle: .Alert)
			
			let okAction = UIAlertAction(title: "Ok", style: .Default) { (action) in }
			alertController.addAction(okAction)
			
			self.presentViewController(alertController, animated: true) { }
		}
    }
	
	func refresh(sender:AnyObject)
	{
		UIApplication.sharedApplication().networkActivityIndicatorVisible = true
		
		let host = self.host!
		let port = self.port!
		let m = match!
		
		Alamofire.request(.GET, "http://\(host):\(port)/api/player/team/\(m["teamHomeId"])").responseJSON { response in
			//print(response.request)  // original URL request
			//print(response.response) // URL response
			//print(response.data)     // server data
			//print(response.result)   // result of response serialization
			
			print("[PlayerTVC - teamHome] .GET Request Succes")
			
			let players = JSON(data: response.data!)
			
			if players.count > 0
			{
				print("[PlayerTVC - teamHome] Players Available")
				
				//print("JSON: \(players)")
				self.players[0] = players
				
				self.tableView.reloadData()
			}
			else
			{
				print("[PlayerTVC - teamHome] No Players Available")
				
				let alertController = UIAlertController(title: "No Players found!", message: "Currently there are no players available!", preferredStyle: .Alert)
				
				let okAction = UIAlertAction(title: "Ok", style: .Default) { (action) in }
				alertController.addAction(okAction)
				
				self.presentViewController(alertController, animated: true) { }
			}
			
			UIApplication.sharedApplication().networkActivityIndicatorVisible = false
			self.refreshControl!.endRefreshing()
		}
		
		Alamofire.request(.GET, "http://\(host):\(port)/api/player/team/\(m["teamAwayId"])").responseJSON { response in
			//print(response.request)  // original URL request
			//print(response.response) // URL response
			print(response.data)     // server data
			//print(response.result)   // result of response serialization
			
			print("[PlayerTVC - teamAway] .GET Request Succes")
			
			let players = JSON(data: response.data!)
			
			print(players)
			
			if players.count > 0
			{
				print("[PlayerTVC - teamAway] Players Available")
				
				//print("JSON: \(players)")
				self.players[1] = players
				
				self.tableView.reloadData()
			}
			else
			{
				print("[PlayerTVC - teamAway] No Players Available")
				
				let alertController = UIAlertController(title: "No Players found!", message: "Currently there are no players available!", preferredStyle: .Alert)
				
				let okAction = UIAlertAction(title: "Ok", style: .Default) { (action) in }
				alertController.addAction(okAction)
				
				self.presentViewController(alertController, animated: true) { }
			}
			
			UIApplication.sharedApplication().networkActivityIndicatorVisible = false
			self.refreshControl!.endRefreshing()
		}
	}

    // MARK: - Table view data source

	override func tableView(tableView: UITableView, titleForHeaderInSection section: Int) -> String?
	{
		return self.teams[section].string
	}
	
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int
	{
        // #warning Incomplete implementation, return the number of sections
        return self.teams.count
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int
	{
        // #warning Incomplete implementation, return the number of rows
        return self.players[section].count
    }
	
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell
	{
        let cell = tableView.dequeueReusableCellWithIdentifier("PlayerCell", forIndexPath: indexPath)
		let p = self.players[indexPath.section][indexPath.row]
		
        // Configure the cell...
		cell.textLabel!.text = "\(p["firstName"]) \(p["lastName"])"

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
		
		if segue.identifier == "segueGameVC"
		{
			if let cs = self.currentSelected
			{
				let host = self.host
				let port = self.port
				let match = self.match
				let selectedTeam = self.teams[cs.section]
				let selectedPlayer = self.players[cs.section][cs.row]
				
				let vc = segue.destinationViewController as! GameViewController
				vc.host = host
				vc.port = port
				vc.match = match
				vc.selectedTeam = selectedTeam
				vc.selectedPlayer = selectedPlayer
			}
			else
			{
				let alertController = UIAlertController(title: "No player selected!", message: "Please select a player first.", preferredStyle: .Alert)
				
				let okAction = UIAlertAction(title: "Ok", style: .Default) { (action) in }
				alertController.addAction(okAction)
				
				self.presentViewController(alertController, animated: true) { }
			}
		}
    }
}
