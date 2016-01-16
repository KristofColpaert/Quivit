//
//  PlayerTableViewController.swift
//  iOSClient
//
//  Created by Bart Callant on 23/11/15.
//  Copyright © 2015 Bart Callant. All rights reserved.
//

import UIKit
import SwiftyJSON

class PlayerTableViewController: UITableViewController
{
	var quivit = Quivit()
	
	var teams:[JSON] = []
	var players:[JSON] = [[], []]
	
    override func viewDidLoad()
	{
        super.viewDidLoad()

		if let m = quivit.match
		{
			self.refreshControl = UIRefreshControl()
			self.refreshControl!.addTarget(self, action: "refresh:", forControlEvents: UIControlEvents.ValueChanged)
			self.tableView.addSubview(refreshControl!)
			
			teams = [m["teamHome", "name"], m["teamAway", "name"]]
			self.refreshControl!.beginRefreshing()
			refresh("")
		}
		else { Quivit.showAlert(self, title: "No match selected!", message: "Please select a match first!") }
    }
	
	func refresh(sender:AnyObject)
	{
		let m = quivit.match!
		
		quivit.getPlayers(teamId: m["teamHomeId"].stringValue, completionHandler: {(responseObject:JSON?, error:NSError?) in
			if let players = responseObject
			{
				if players.count > 0
				{
					print("[PlayerTVC - teamHome] Players Available")
					self.players[0] = players
					self.tableView.reloadData()
				}
				else
				{
					print("[PlayerTVC - teamHome] No Players Available")
					Quivit.showAlert(self, title: "No Players found!", message: "Currently there are no players available!")
				}
			}
			else if let _ = error { Quivit.showAlert(self, title: "Unable to connect!", message: "Could not connect to server. Check the host and the port, then try again.") }
			else { Quivit.showAlert(self, title: "Someting went wrong!", message: "Please try again.") }
		})
		
		quivit.getPlayers(teamId: m["teamAwayId"].stringValue, completionHandler: {(responseObject:JSON?, error:NSError?) in
			if let players = responseObject
			{
				if players.count > 0
				{
					print("[PlayerTVC - teamHome] Players Available")
					self.players[1] = players
					self.tableView.reloadData()
				}
				else
				{
					print("[PlayerTVC - teamHome] No Players Available")
					Quivit.showAlert(self, title: "No Players found!", message: "Currently there are no players available!")
				}
			}
			else if let _ = error { Quivit.showAlert(self, title: "Unable to connect!", message: "Could not connect to server. Check the host and the port, then try again.") }
			else { Quivit.showAlert(self, title: "Someting went wrong!", message: "Please try again.") }
		})
		
		self.refreshControl?.endRefreshing()
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
				print("[PlayerTVC] Segue to GameTVC")
				
				self.quivit.selectedTeam = self.teams[cs.section]
				self.quivit.selectedPlayer = self.players[cs.section][cs.row]
				
				let vc = segue.destinationViewController as! GameViewController
				vc.quivit = self.quivit
			}
			else { Quivit.showAlert(self, title: "No player selected!", message: "Please select a player first.") }
		}
    }
}
