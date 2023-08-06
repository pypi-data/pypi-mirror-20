class Neuron(object):
    """
    This Class is representing a Neuron which is corresponding to an action to perform.

    .. note:: Neurons are defined in the brain file
    """

    def __init__(self, name=None, parameters=None):
        self.name = name
        self.parameters = parameters

    def serialize(self):
        """
        This method allows to serialize in a proper way this object

        :return: A dict of name and parameters
        :rtype: Dict
        """
        return {
            'name': self.name,
            'parameters': self.parameters
        }

    def __str__(self):
        """
        Return a string that describe the neuron. If a parameter contains the word "password",
        the output of this parameter will be masked in order to not appears in clean in the console
        :return: string description of the neuron
        """
        returned_string = str()
        returned_string += "Neuron: name: %s" % self.name
        cleaned_parameters = dict()
        for key, value in self.parameters.iteritems():
            if "password" in key:
                cleaned_parameters[key] = "*****"
            else:
                cleaned_parameters[key] = value
        returned_string += ", parameters: %s" % cleaned_parameters
        return returned_string

    def __eq__(self, other):
        """
        This is used to compare 2 objects
        :param other:
        :return:
        """
        return self.__dict__ == other.__dict__
