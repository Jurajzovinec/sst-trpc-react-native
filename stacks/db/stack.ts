export function DbStack() {
	// const vpc = new sst.aws.Vpc("EvolvVpc", {
	//   bastion: true,
	//   nat: "ec2",
	// });

	// The specified instance type is not eligible for Free Tier. For a list of Free Tier instance types,
	// run 'describe-instance-types' with the filter 'free-tier-eligible=true'

	/// Solution: Use 'managed' for x86_64 Free tier eligible

	// const vpc = new sst.aws.Vpc("EvolvVpc", {
	//   bastion: true,
	//   nat: "managed",
	// });

	// api error InvalidParameter Combination: The specified instance type is not eligible for
	// Free Tier  For a list of Free Tier instance types, run 'describe-instance-types' with the filter 'free-tier-eligible=true'

	// Solution: Use 'ec2' for ARM64 Free tier eligible, see: https://chatgpt.com/share/68a2cc48-5664-8001-a6e1-45d94abee3f4

	// const vpc = new sst.aws.Vpc("EvolvVpc", {
	//   nat: {
	//     'type': 'ec2', // Use EC2 instance as NAT
	//     'ec2': { 'instance': 't3.micro' }
	//   }
	// })

	// The architecture 'x86_64' of the specified instance type does not match the architecture 'arm64' of the specified AMI.
	// Specify an instance type and an AMI that have matching architectures, and try again. You
	// can use 'describe-instance-types' or 'describe-images' to discover the architecture of the instance type or AMI.
	// Must use 't4g.micro' for ARM64 Free tier eligible

	const vpc = new sst.aws.Vpc('Vpc', {
		nat: {
			type: 'ec2', // Use EC2 instance as NAT
			ec2: {
				instance: 't4g.micro' // ARM64 Free tier eligible
			}
		},
		bastion: true // Enable bastion host for SSH access
	})

	const rds = new sst.aws.Postgres('Database', {
		instance: 't3.micro', // ARM64 Free tier eligible
		vpc,
		proxy: true
	})

	/**
	 * Connect to VPC from localhost:
	 * @see https://sst.dev/docs/start/aws/drizzle/#install-a-tunnel
	 */
	new sst.x.DevCommand('Studio', {
		link: [rds],
		dev: {
			command: 'npx drizzle-kit studio'
		}
	})

	return {
		vpc,
		rds
	}
}
