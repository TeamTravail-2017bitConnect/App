package travail_solutions.vrp_computer;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import com.graphhopper.jsprit.core.algorithm.VehicleRoutingAlgorithm;
import com.graphhopper.jsprit.core.algorithm.box.SchrimpfFactory;
import com.graphhopper.jsprit.core.problem.VehicleRoutingProblem;
import com.graphhopper.jsprit.core.problem.VehicleRoutingProblem.FleetSize;
import com.graphhopper.jsprit.core.problem.job.Shipment;
import com.graphhopper.jsprit.core.problem.solution.VehicleRoutingProblemSolution;
import com.graphhopper.jsprit.core.problem.vehicle.VehicleImpl;
import com.graphhopper.jsprit.core.reporting.SolutionPrinter;
import com.graphhopper.jsprit.core.reporting.SolutionPrinter.Print;
import com.graphhopper.jsprit.core.util.Solutions;

public class VRPManager {
	
	List<VehicleImpl> vehicleImpleList;
	List<Shipment> shipmentList;
	VehicleRoutingProblem vrpProblem;
	VehicleRoutingProblemSolution vrpBestSol;
	
	
	public VRPManager(List<VehicleImpl> vehicleImpleList,
			List<Shipment> shipmentList) {
		this.vehicleImpleList = vehicleImpleList;
		this.shipmentList = shipmentList;
	}


	public void createProblem(){

		VehicleRoutingProblem.Builder vrpBuilder = VehicleRoutingProblem.Builder.newInstance();
		
		// Set params of the problem
		vrpBuilder.setFleetSize(FleetSize.FINITE);
		
		// Set vehicles
		Iterator<VehicleImpl> vehicleIterator = vehicleImpleList.iterator();
		while(vehicleIterator.hasNext()){
			vrpBuilder.addVehicle(vehicleIterator.next());
		}
		
		// Set shipment
		Iterator<Shipment> shipmentIterator = shipmentList.iterator();
		while(shipmentIterator.hasNext()){
			vrpBuilder.addJob(shipmentIterator.next());
		}		
		
		// Build Problem
		this.vrpProblem = vrpBuilder.build();
		
	}
	
	public void solveProblem(){
		// Get the algorithm out-of-the-box. 
		VehicleRoutingAlgorithm algorithm = new SchrimpfFactory().createAlgorithm(this.vrpProblem);
		
		// Solve the problem
		Collection<VehicleRoutingProblemSolution> solutions = algorithm.searchSolutions();
		
		// Get the best solution
		this.vrpBestSol = Solutions.bestOf(solutions);
		
	}
	
	public void printSol(){
		SolutionPrinter.print(this.vrpProblem, this.vrpBestSol, Print.VERBOSE);
		
	}
	
	
	
	
	

}
