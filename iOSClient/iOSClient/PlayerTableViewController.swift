//
//  PlayerTableViewController.swift
//  iOSClient
//
//  Created by Bart Callant on 23/11/15.
//  Copyright © 2015 Bart Callant. All rights reserved.
//

import UIKit

class PlayerTableViewController: UITableViewController {

	let appDelegate = UIApplication.sharedApplication().delegate as! AppDelegate
	
    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

	override func tableView(tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
		return (self.appDelegate.teams[section] as! String)
	}
	
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return self.appDelegate.teams.count
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return self.appDelegate.players[section].count
    }
	
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("PlayerCell", forIndexPath: indexPath)

		let p = self.appDelegate.players[indexPath.section] as! [String]
		
        // Configure the cell...
		cell.textLabel!.text = p[indexPath.row]

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

	@IBAction func handlerStartGame(sender: AnyObject)
	{
		if let cs = currentSelected
		{
			let p = self.appDelegate.players[cs.section] as! [String]
			self.appDelegate.selectedTeam = (self.appDelegate.teams[cs.section] as! String)
			self.appDelegate.selectedPlayer = p[cs.row]
			
			self.navigationController?.performSegueWithIdentifier("segueGameVC", sender: nil)
		}
		else
		{
			let alertController = UIAlertController(title: "No player selected!", message: "Please select a player first.", preferredStyle: .Alert)
			
			let OKAction = UIAlertAction(title: "OK", style: .Default) { (action) in }
			alertController.addAction(OKAction)
			
			self.presentViewController(alertController, animated: true) {}
		}
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
